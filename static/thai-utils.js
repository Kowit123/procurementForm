/**
 * Thai language utilities for the procurement document generator.
 * This module handles Thai-specific functionality like Baht text conversion and Buddhist Era dates.
 */

/**
 * Convert a number to Thai text representation.
 * For example: 1,234.56 -> หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์
 * 
 * @param {number} number - Number to convert
 * @returns {string} Thai text representation of the number
 */
function numToThaiText(number) {
    // Dictionary for Thai number words
    const thaiNumbers = {
        0: "ศูนย์",
        1: "หนึ่ง",
        2: "สอง",
        3: "สาม",
        4: "สี่",
        5: "ห้า",
        6: "หก",
        7: "เจ็ด",
        8: "แปด",
        9: "เก้า"
    };
    
    // Handle negative numbers
    if (number < 0) {
        return "ลบ" + numToThaiText(Math.abs(number));
    }
    
    // Handle zero
    if (number === 0) {
        return thaiNumbers[0] + "บาทถ้วน";
    }
    
    // Split the number into integer and decimal parts
    const strNumber = number.toString();
    let integerPart, decimalPart;
    
    if (strNumber.includes('.')) {
        [integerPart, decimalPart] = strNumber.split('.');
        // Ensure decimal part has exactly 2 digits
        decimalPart = decimalPart.padEnd(2, '0').substring(0, 2);
    } else {
        integerPart = strNumber;
        decimalPart = "00";
    }
    
    // Convert integer part to Thai text
    let bahtText = "";
    if (parseInt(integerPart) > 0) {
        bahtText = convertIntegerToThai(parseInt(integerPart));
        bahtText += "บาท";
    }
    
    // Convert decimal part to Thai text
    let satangText = "";
    if (parseInt(decimalPart) > 0) {
        satangText = convertIntegerToThai(parseInt(decimalPart));
        satangText += "สตางค์";
    } else {
        satangText = "ถ้วน";
    }
    
    return bahtText + satangText;
}

/**
 * Helper function to convert an integer to Thai text.
 * 
 * @param {number} number - Integer to convert
 * @returns {string} Thai text representation of the integer
 */
function convertIntegerToThai(number) {
    // Dictionary for Thai number words
    const thaiNumbers = {
        0: "ศูนย์",
        1: "หนึ่ง",
        2: "สอง",
        3: "สาม",
        4: "สี่",
        5: "ห้า",
        6: "หก",
        7: "เจ็ด",
        8: "แปด",
        9: "เก้า"
    };
    
    // Dictionary for Thai position words
    const thaiPositions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
    
    // Handle zero
    if (number === 0) {
        return thaiNumbers[0];
    }
    
    // Convert to string for easier digit manipulation
    const strNumber = number.toString();
    const length = strNumber.length;
    
    // Handle numbers greater than or equal to 10 million
    if (length > 7) {
        // Split into millions and remainder
        const millions = Math.floor(number / 1000000);
        const remainder = number % 1000000;
        
        const millionsText = convertIntegerToThai(millions) + "ล้าน";
        
        if (remainder === 0) {
            return millionsText;
        } else {
            return millionsText + convertIntegerToThai(remainder);
        }
    }
    
    // Process each digit
    let result = "";
    for (let i = 0; i < strNumber.length; i++) {
        const position = length - i - 1;
        const digitValue = parseInt(strNumber[i]);
        
        // Skip zeros
        if (digitValue === 0) {
            continue;
        }
        
        // Special case for 1 in tens position
        if (position === 1 && digitValue === 1) {
            result += "สิบ";
        }
        // Special case for 2 in tens position
        else if (position === 1 && digitValue === 2) {
            result += "ยี่สิบ";
        }
        // Special case for 1 in ones position
        else if (position === 0 && digitValue === 1 && length > 1) {
            result += "เอ็ด";
        }
        else {
            result += thaiNumbers[digitValue] + thaiPositions[position];
        }
    }
    
    return result;
}

/**
 * Convert a Gregorian calendar date to Buddhist Era date.
 * Buddhist Era = Gregorian year + 543
 * 
 * @param {Date} date - Gregorian date to convert
 * @returns {Object} Dictionary containing formatted date in Buddhist Era
 */
function gregorianToBuddhistEra(date) {
    if (!(date instanceof Date)) {
        throw new TypeError("Input must be a Date object");
    }
    
    // Thai month names
    const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    
    // Convert year to Buddhist Era
    const buddhistYear = date.getFullYear() + 543;
    
    // Get month and day
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    
    // Get Thai month name
    const thaiMonth = thaiMonths[date.getMonth()];
    
    // Format full date in Thai format
    const thaiDate = `${day} ${thaiMonth} พ.ศ. ${buddhistYear}`;
    
    return {
        year: buddhistYear,
        month: month,
        day: day,
        thaiMonth: thaiMonth,
        thaiDate: thaiDate
    };
}

/**
 * Format a Date object as a Thai date string.
 * 
 * @param {Date} date - Date to format
 * @param {boolean} includeWeekday - Whether to include the weekday in the output
 * @returns {string} Formatted Thai date string
 */
function formatThaiDate(date, includeWeekday = false) {
    if (!(date instanceof Date)) {
        throw new TypeError("Input must be a Date object");
    }
    
    // Convert to Buddhist Era
    const beDate = gregorianToBuddhistEra(date);
    
    // For normal use, we don't include weekday as per requirements
    // But for tests, we need to support the includeWeekday parameter
    if (includeWeekday) {
        // Thai weekday names - JavaScript getDay() returns 0 for Sunday, 6 for Saturday
        const thaiWeekdays = [
            "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", 
            "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
        ];
        
        // Get weekday (0 is Sunday in JavaScript's Date.getDay())
        const weekday = date.getDay();
        const thaiWeekday = thaiWeekdays[weekday];
        return `${thaiWeekday}ที่ ${beDate.day} ${beDate.thaiMonth} พ.ศ. ${beDate.year}`;
    } else {
        return beDate.thaiDate;
    }
}

/**
 * Enhanced version of convertToThaiDate function with full Thai utilities
 * This replaces the basic function in index.html
 * 
 * @param {Date} date - Date to convert
 * @returns {string} Thai date string in Buddhist Era format
 */
function convertToThaiDate(date) {
    return formatThaiDate(date, false);
}

/**
 * Format a number with Thai digit grouping (e.g., 1,234,567.89)
 * 
 * @param {number} number - Number to format
 * @returns {string} Formatted number string with Thai digit grouping
 */
function formatThaiNumber(number) {
    return number.toLocaleString('th-TH');
}

/**
 * Format a currency amount in Thai Baht format
 * 
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount with ฿ symbol and proper digit grouping
 */
function formatThaiCurrency(amount) {
    return amount.toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB'
    });
}

/**
 * Get Thai weekday name for a given date
 * 
 * @param {Date} date - Date to get weekday for
 * @returns {string} Thai weekday name
 */
function getThaiWeekdayName(date) {
    if (!(date instanceof Date)) {
        throw new TypeError("Input must be a Date object");
    }
    
    // Thai weekday names - JavaScript getDay() returns 0 for Sunday, 6 for Saturday
    const thaiWeekdays = [
        "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", 
        "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
    ];
    
    return thaiWeekdays[date.getDay()];
}

// Export functions for use in other modules (if using ES6 modules)
// For browser compatibility, functions are available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        numToThaiText,
        convertIntegerToThai,
        gregorianToBuddhistEra,
        formatThaiDate,
        convertToThaiDate,
        formatShortBuddhistDate,
        formatThaiNumber,
        formatThaiCurrency,
        getThaiWeekdayName
    };
}

/**
 * Format a date in short Buddhist Era format (DD/MM/YYYY)
 * 
 * @param {Date} date - Date to format
 * @returns {string} Date in DD/MM/YYYY format with Buddhist Era year
 */
function formatShortBuddhistDate(date) {
    if (!(date instanceof Date)) {
        throw new TypeError("Input must be a Date object");
    }
    const buddhistYear = date.getFullYear() + 543;
    // Get month and day
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const day = date.getDate();
    return `${day}/${month}/${buddhistYear}`;
}
/**

 * Initialize Flatpickr Thai date pickers
 * This function sets up Thai Buddhist Era date pickers with proper formatting
 */
function initializeThaiDatePickers() {
    // flatpickr date (แปลง พ.ศ.)
    const ids = ["thai-datepicker1"];
    const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    
    ids.forEach(id => {
        const thaidate = document.getElementById(id);
        if (!thaidate) return; // Skip if element doesn't exist
        
        const originalPlaceholder = thaidate.getAttribute("placeholder") || "ว/ด/ปี";
        
        flatpickr(`#${id}`, {
            locale: "th",
            allowInput: true,
            altInput: true,
            altFormat: "j F Y", // j = day, F = full month, Y = year
            dateFormat: "Y-m-d", // for storing (optional)
            defaultDate: new Date(), // Set default to today
            onChange: (_, __, instance) => convertToBE(instance),
            onReady: (_, __, instance) => {
                convertToBE(instance);
                setTimeout(() => {
                    thaidate.setAttribute("placeholder", originalPlaceholder);
                }, 0);
            },
            formatDate: (date, format, locale) => {
                const day = date.getDate();
                const month = thaiMonths[date.getMonth()];
                const year = date.getFullYear() + 543;
                return `${day} ${month} ${year}`;
            }
        });
    });

    /**
     * Convert selected date to Buddhist Era format
     * @param {Object} instance - Flatpickr instance
     */
    function convertToBE(instance) {
        const date = instance.selectedDates[0];
        if (!date) return;
        
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = (date.getFullYear() + 543).toString();
        const formatted = `${day}/${month}/${year}`;
        
        // Update the actual input value
        instance.element.value = formatted;
        
        // Create hidden input for current date if it doesn't exist
        let currentDateInput = document.getElementById('current_date');
        if (!currentDateInput) {
            currentDateInput = document.createElement('input');
            currentDateInput.type = 'hidden';
            currentDateInput.id = 'current_date';
            currentDateInput.name = 'current_date';
            const form = document.getElementById('procurementForm');
            if (form) {
                form.appendChild(currentDateInput);
            }
        }

        // Set the value for document generation (full Thai format)
        const thaiDate = convertToThaiDate(date);
        currentDateInput.value = thaiDate;
    }

    // Initialize with current date for the first picker
    const firstPicker = document.getElementById('thai-datepicker1, thai-datepicker2');
    if (firstPicker) {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = (currentDate.getFullYear() + 543).toString();
        firstPicker.value = `${day}/${month}/${year}`;
    }
}

/**
 * Initialize Thai date picker when DOM is loaded
 * Call this function to set up all Thai date pickers on the page
 */
function setupThaiDatePickers() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeThaiDatePickers);
    } else {
        initializeThaiDatePickers();
    }
}