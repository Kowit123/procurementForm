// Supply list functionality for dynamic table management
document.addEventListener('DOMContentLoaded', function () {
    let rowCounter = 1;

    // Add new supply row
    document.getElementById('addSupplyRow').addEventListener('click', function () {
        rowCounter++;
        const tbody = document.querySelector('.supply-list-table tbody');
        const newRow = document.createElement('tr');
        newRow.className = 'supply-item';

        newRow.innerHTML = `
            <td><input type="text" name="supply_name[]" required></td>
            <td><input type="text" name="supply_amount[]" min="1" required></td>
            <td><input type="text" name="supply_unit[]" required></td>
            <td><input type="text" name="supply_price_unit[]" min="0" step="0.01" required></td>
            <td><input type="text" name="sum_supply_price[]" readonly></td>
            <td class="radio-cell"><input type="radio" name="product_origin_${rowCounter}" value="domestic" checked></td>
            <td class="radio-cell"><input type="radio" name="product_origin_${rowCounter}" value="foreign"></td>
        `;

        tbody.appendChild(newRow);

        // Add event listeners to new inputs
        addCalculationListeners(newRow);
        addValidationListeners(newRow);
        updateTotals();
    });

    // Delete last supply row
    document.getElementById('deleteSupplyRow').addEventListener('click', function () {
        const tbody = document.querySelector('.supply-list-table tbody');
        const rows = tbody.querySelectorAll('.supply-item');

        if (rows.length > 1) {
            tbody.removeChild(rows[rows.length - 1]);
            updateTotals();
        } else {
            alert('ต้องมีรายการอย่างน้อย 1 รายการ');
        }
    });

    // Format number with commas
    function formatNumberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Format input field with commas as user types
    function formatInputWithCommas(input) {
        let value = input.value.replace(/,/g, ''); // Remove existing commas
        if (value && !isNaN(value)) {
            input.value = formatNumberWithCommas(value);
        }
    }

    // Custom validation for number inputs
    function validateNumberInput(input) {
        const rawValue = input.value.replace(/,/g, '').trim();
        const value = parseFloat(rawValue);
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));
        const step = parseFloat(input.getAttribute('step'));

        let isValid = true;
        let errorMessage = '';

        // Always reset styling first
        input.classList.remove('error');
        input.title = '';
        input.style.border = '';

        // Skip validation if field is empty (let required validation handle it)
        if (rawValue === '') {
            return true;
        }

        // Check if it's a valid number
        if (isNaN(value)) {
            isValid = false;
            errorMessage = 'กรุณาใส่ตัวเลขที่ถูกต้อง';
        }
        // Check minimum value (only if it's a valid number)
        else if (!isNaN(min) && value < min) {
            isValid = false;
            errorMessage = `ค่าต้องไม่น้อยกว่า ${min}`;
        }
        // Check maximum value (only if it's a valid number)
        else if (!isNaN(max) && value > max) {
            isValid = false;
            errorMessage = `ค่าต้องไม่เกิน ${max}`;
        }
        // Check step validation (for decimal places) - only if it's a valid number
        else if (!isNaN(step) && step < 1 && value > 0) {
            const decimalPlaces = (step.toString().split('.')[1] || '').length;
            const valueStr = value.toString();
            const valueDecimalPlaces = (valueStr.split('.')[1] || '').length;
            if (valueDecimalPlaces > decimalPlaces) {
                isValid = false;
                errorMessage = `ทศนิยมได้สูงสุด ${decimalPlaces} ตำแหน่ง`;
            }
        }

        // Apply validation styling only if invalid
        if (!isValid) {
            input.classList.add('error');
            input.title = errorMessage;
            input.style.border = '2px solid red';
            alert('Validation failed: ' + errorMessage);
        }

        return isValid;
    }

    // Add calculation listeners to existing and new rows
    function addCalculationListeners(row) {
        const amountInput = row.querySelector('input[name="supply_amount[]"]');
        const priceInput = row.querySelector('input[name="supply_price_unit[]"]');
        const sumInput = row.querySelector('input[name="sum_supply_price[]"]');

        function calculateRowTotal() {
            const amount = parseFloat(amountInput.value.replace(/,/g, '')) || 0;
            const price = parseFloat(priceInput.value.replace(/,/g, '')) || 0;
            const total = amount * price;
            sumInput.value = formatNumberWithCommas(total.toFixed(2));
            updateTotals();
        }

        // Add formatting and calculation listeners
        amountInput.addEventListener('input', function () {
            calculateRowTotal();
        });

        amountInput.addEventListener('blur', function () {
            validateNumberInput(this);
            formatInputWithCommas(this);
        });

        priceInput.addEventListener('input', function () {
            calculateRowTotal();
        });

        priceInput.addEventListener('blur', function () {
            validateNumberInput(this);
            formatInputWithCommas(this);
        });
    }

    // Add validation listeners to new rows
    function addValidationListeners(row) {
        const requiredInputs = row.querySelectorAll('[required]');
        requiredInputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });

            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }

    // Update grand total and item count with VAT calculation
    function updateTotals() {
        const sumInputs = document.querySelectorAll('input[name="sum_supply_price[]"]');
        let subtotal = 0;
        let itemCount = 0;

        sumInputs.forEach(function (input) {
            const value = parseFloat(input.value.replace(/,/g, '')) || 0;
            if (value > 0) {
                subtotal += value;
                itemCount++;
            }
        });

        // Get VAT status
        const vatStatus = document.querySelector('input[name="vat_status"]:checked').value;
        let vatAmount = 0;
        let grandTotal = subtotal;

        // Calculate based on VAT status
        if (vatStatus === 'vat_excluded') {
            // Calculate VAT on subtotal
            vatAmount = subtotal * 0.07;
            grandTotal = subtotal + vatAmount;
            document.getElementById('vatRow').style.display = 'flex';
        } else if (vatStatus === 'vat_included') {
            // Calculate VAT from total (reverse calculation)
            vatAmount = subtotal - (subtotal / 1.07);
            grandTotal = subtotal;
            document.getElementById('vatRow').style.display = 'flex';
        } else {
            // No VAT
            vatAmount = 0;
            grandTotal = subtotal;
            document.getElementById('vatRow').style.display = 'none';
        }

        // Update display
        document.getElementById('totalItems').textContent = sumInputs.length;
        document.getElementById('vatAmount').textContent = formatNumberWithCommas(vatAmount.toFixed(2));
        document.getElementById('grandTotal').textContent = formatNumberWithCommas(grandTotal.toFixed(2));
    }

    // Add VAT status change listeners
    document.querySelectorAll('input[name="vat_status"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            updateTotals();
        });
    });

    // Initialize calculation listeners for existing rows
    document.querySelectorAll('.supply-item').forEach(function (row) {
        addCalculationListeners(row);
        addValidationListeners(row);
    });

    // Initial total calculation
    updateTotals();
});