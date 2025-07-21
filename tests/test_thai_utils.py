"""
Tests for Thai language utilities.
"""

import pytest
import sys
import os

# Add the parent directory to the path so we can import the utils module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.thai_utils import num_to_thai_text, gregorian_to_buddhist_era
from datetime import datetime

# These tests will be implemented in tasks 2.1 and 2.2
@pytest.mark.skip(reason="Will be implemented in task 2.1")
def test_num_to_thai_text():
    """Test the conversion of numbers to Thai text."""
    pytest.skip("This test will be implemented in task 2.1")

@pytest.mark.skip(reason="Will be implemented in task 2.2")
def test_gregorian_to_buddhist_era():
    """Test the conversion of Gregorian dates to Buddhist Era."""
    pytest.skip("This test will be implemented in task 2.2")