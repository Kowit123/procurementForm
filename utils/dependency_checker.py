#!/usr/bin/env python
"""
Dependency Consistency Checker

This script checks for consistency between Pipfile and requirements.txt.
It can be used as part of CI/CD pipelines to ensure dependencies are in sync.
"""
import re
import sys
from pathlib import Path
from datetime import datetime


def normalize_package_name(name):
    """Normalize package name to lowercase for comparison."""
    return name.lower()


def parse_requirements_txt(file_path):
    """Parse requirements.txt file into a dictionary of package names and versions."""
    requirements = {}
    
    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
                
            # Handle package with version constraint
            if '==' in line:
                package, version = line.split('==', 1)
                requirements[normalize_package_name(package)] = version
            else:
                requirements[normalize_package_name(line)] = None
                
    return requirements


def parse_pipfile(file_path):
    """Parse Pipfile into dictionaries of package names and versions."""
    packages = {}
    dev_packages = {}
    
    section = None
    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            
            if line.startswith('[packages]'):
                section = 'packages'
                continue
            elif line.startswith('[dev-packages]'):
                section = 'dev-packages'
                continue
            elif line.startswith('['):
                section = None
                continue
                
            if section in ('packages', 'dev-packages') and '=' in line:
                # Extract package name and version
                match = re.match(r'([a-zA-Z0-9_-]+)\s*=\s*"==([^"]+)"', line)
                if match:
                    package, version = match.groups()
                    package = normalize_package_name(package)
                    if section == 'packages':
                        packages[package] = version
                    else:
                        dev_packages[package] = version
    
    return packages, dev_packages


def compare_dependencies(verbose=True):
    """
    Compare dependencies between Pipfile and requirements.txt.
    
    Args:
        verbose (bool): Whether to print detailed results
        
    Returns:
        bool: True if all dependencies are consistent, False otherwise
    """
    base_dir = Path(__file__).parent.parent
    pipfile_path = base_dir / 'Pipfile'
    requirements_path = base_dir / 'requirements.txt'
    
    # Check if files exist
    if not pipfile_path.exists():
        print(f"Error: {pipfile_path} not found")
        return False
        
    if not requirements_path.exists():
        print(f"Error: {requirements_path} not found")
        return False
    
    # Parse files
    req_packages = parse_requirements_txt(requirements_path)
    pipfile_packages, pipfile_dev_packages = parse_pipfile(pipfile_path)
    
    # Combine all Pipfile packages for comparison
    all_pipfile_packages = {**pipfile_packages, **pipfile_dev_packages}
    
    # Check for packages in requirements.txt but not in Pipfile
    missing_in_pipfile = [pkg for pkg in req_packages if pkg not in all_pipfile_packages]
    
    # Check for packages in Pipfile but not in requirements.txt
    missing_in_requirements = [pkg for pkg in all_pipfile_packages if pkg not in req_packages]
    
    # Check for version mismatches
    version_mismatches = []
    for pkg in req_packages:
        if pkg in all_pipfile_packages and req_packages[pkg] != all_pipfile_packages[pkg]:
            version_mismatches.append((pkg, req_packages[pkg], all_pipfile_packages[pkg]))
    
    # Print results if verbose
    if verbose:
        print("\n=== Dependency Comparison Results ===\n")
        
        print("Packages in requirements.txt but missing in Pipfile:")
        if missing_in_pipfile:
            for pkg in missing_in_pipfile:
                print(f"  - {pkg}=={req_packages[pkg]}")
        else:
            print("  None")
        
        print("\nPackages in Pipfile but missing in requirements.txt:")
        if missing_in_requirements:
            for pkg in missing_in_requirements:
                if pkg in pipfile_packages:
                    print(f"  - {pkg}=={pipfile_packages[pkg]} (production)")
                else:
                    print(f"  - {pkg}=={pipfile_dev_packages[pkg]} (development)")
        else:
            print("  None")
        
        print("\nVersion mismatches:")
        if version_mismatches:
            for pkg, req_ver, pip_ver in version_mismatches:
                print(f"  - {pkg}: requirements.txt=={req_ver}, Pipfile=={pip_ver}")
        else:
            print("  None")
        
        # Summary
        print("\nSummary:")
        print(f"  - Total packages in requirements.txt: {len(req_packages)}")
        print(f"  - Total packages in Pipfile [packages]: {len(pipfile_packages)}")
        print(f"  - Total packages in Pipfile [dev-packages]: {len(pipfile_dev_packages)}")
        print(f"  - Packages missing in Pipfile: {len(missing_in_pipfile)}")
        print(f"  - Packages missing in requirements.txt: {len(missing_in_requirements)}")
        print(f"  - Version mismatches: {len(version_mismatches)}")
    
    # Return True if everything is consistent
    is_consistent = not (missing_in_pipfile or missing_in_requirements or version_mismatches)
    
    if verbose:
        if is_consistent:
            print("\nAll dependencies are consistent between Pipfile and requirements.txt!")
        else:
            print("\nDiscrepancies found between Pipfile and requirements.txt")
    
    return is_consistent


def generate_dependency_report(output_file=None):
    """
    Generate a markdown report of dependency comparison.
    
    Args:
        output_file (str, optional): Path to output file. If None, prints to stdout.
        
    Returns:
        bool: True if all dependencies are consistent, False otherwise
    """
    base_dir = Path(__file__).parent.parent
    pipfile_path = base_dir / 'Pipfile'
    requirements_path = base_dir / 'requirements.txt'
    
    # Check if files exist
    if not pipfile_path.exists() or not requirements_path.exists():
        print("Error: Required dependency files not found")
        return False
    
    # Parse files
    req_packages = parse_requirements_txt(requirements_path)
    pipfile_packages, pipfile_dev_packages = parse_pipfile(pipfile_path)
    
    # Combine all Pipfile packages for comparison
    all_pipfile_packages = {**pipfile_packages, **pipfile_dev_packages}
    
    # Check for packages in requirements.txt but not in Pipfile
    missing_in_pipfile = [(pkg, req_packages[pkg]) for pkg in req_packages if pkg not in all_pipfile_packages]
    
    # Check for packages in Pipfile but not in requirements.txt
    missing_in_requirements = []
    for pkg in all_pipfile_packages:
        if pkg not in req_packages:
            if pkg in pipfile_packages:
                missing_in_requirements.append((pkg, pipfile_packages[pkg], "production"))
            else:
                missing_in_requirements.append((pkg, pipfile_dev_packages[pkg], "development"))
    
    # Check for version mismatches
    version_mismatches = []
    for pkg in req_packages:
        if pkg in all_pipfile_packages and req_packages[pkg] != all_pipfile_packages[pkg]:
            if pkg in pipfile_packages:
                version_mismatches.append((pkg, req_packages[pkg], all_pipfile_packages[pkg], "production"))
            else:
                version_mismatches.append((pkg, req_packages[pkg], all_pipfile_packages[pkg], "development"))
    
    # Generate markdown report
    report = [
        "# Dependency Comparison Report",
        "",
        f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "## Summary",
        "",
        f"- Total packages in requirements.txt: {len(req_packages)}",
        f"- Total packages in Pipfile [packages]: {len(pipfile_packages)}",
        f"- Total packages in Pipfile [dev-packages]: {len(pipfile_dev_packages)}",
        f"- Packages missing in Pipfile: {len(missing_in_pipfile)}",
        f"- Packages missing in requirements.txt: {len(missing_in_requirements)}",
        f"- Version mismatches: {len(version_mismatches)}",
        "",
        "## Details",
        "",
        "### Packages in requirements.txt but missing in Pipfile",
        ""
    ]
    
    if missing_in_pipfile:
        for pkg, version in missing_in_pipfile:
            report.append(f"- `{pkg}=={version}`")
    else:
        report.append("*None*")
    
    report.extend([
        "",
        "### Packages in Pipfile but missing in requirements.txt",
        ""
    ])
    
    if missing_in_requirements:
        for pkg, version, section in missing_in_requirements:
            report.append(f"- `{pkg}=={version}` ({section})")
    else:
        report.append("*None*")
    
    report.extend([
        "",
        "### Version mismatches",
        ""
    ])
    
    if version_mismatches:
        for pkg, req_ver, pip_ver, section in version_mismatches:
            report.append(f"- `{pkg}`: requirements.txt=={req_ver}, Pipfile=={pip_ver} ({section})")
    else:
        report.append("*None*")
    
    # Add recommendation section
    report.extend([
        "",
        "## Recommendations",
        ""
    ])
    
    if not (missing_in_pipfile or missing_in_requirements or version_mismatches):
        report.append("All dependencies are consistent between Pipfile and requirements.txt!")
    else:
        if missing_in_pipfile:
            report.append("### Add the following packages to Pipfile:")
            report.append("```")
            for pkg, version in missing_in_pipfile:
                report.append(f"{pkg} = \"=={version}\"")
            report.append("```")
            report.append("")
        
        if missing_in_requirements:
            report.append("### Add the following packages to requirements.txt:")
            report.append("```")
            for pkg, version, _ in missing_in_requirements:
                report.append(f"{pkg}=={version}")
            report.append("```")
            report.append("")
        
        if version_mismatches:
            report.append("### Resolve the following version mismatches:")
            report.append("```")
            for pkg, req_ver, pip_ver, _ in version_mismatches:
                report.append(f"# Choose one version for {pkg}:")
                report.append(f"# requirements.txt: {pkg}=={req_ver}")
                report.append(f"# Pipfile: {pkg} = \"=={pip_ver}\"")
                report.append("")
            report.append("```")
    
    # Join report lines
    report_text = "\n".join(report)
    
    # Write to file or print to stdout
    if output_file:
        with open(output_file, 'w') as f:
            f.write(report_text)
        print(f"Report written to {output_file}")
    else:
        print(report_text)
    
    # Return True if everything is consistent
    return not (missing_in_pipfile or missing_in_requirements or version_mismatches)


if __name__ == "__main__":
    import argparse
    from datetime import datetime
    
    parser = argparse.ArgumentParser(description="Check dependency consistency between Pipfile and requirements.txt")
    parser.add_argument("--report", "-r", help="Generate a markdown report and save to the specified file")
    parser.add_argument("--quiet", "-q", action="store_true", help="Suppress detailed output")
    
    args = parser.parse_args()
    
    if args.report:
        is_consistent = generate_dependency_report(args.report)
    else:
        is_consistent = compare_dependencies(verbose=not args.quiet)
    
    sys.exit(0 if is_consistent else 1)