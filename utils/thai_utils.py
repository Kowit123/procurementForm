"""
Thai language utilities for the procurement document generator.
This module will handle Thai-specific functionality like Baht text conversion and Buddhist Era dates.
"""

from datetime import datetime
import locale

def num_to_thai_text(number):
    """
    Convert a number to Thai text representation.
    For example: 1,234.56 -> หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์
    
    Args:
        number (float): Number to convert
        
    Returns:
        str: Thai text representation of the number
    """
    # Dictionary for Thai number words
    thai_numbers = {
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
    }
    
    # Dictionary for Thai position words
    thai_positions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"]
    
    # Handle negative numbers
    if number < 0:
        return "ลบ" + num_to_thai_text(abs(number))
    
    # Handle zero
    if number == 0:
        return thai_numbers[0] + "บาทถ้วน"
    
    # Split the number into integer and decimal parts
    str_number = str(number)
    if '.' in str_number:
        integer_part, decimal_part = str_number.split('.')
        # Ensure decimal part has exactly 2 digits
        decimal_part = decimal_part.ljust(2, '0')[:2]
    else:
        integer_part = str_number
        decimal_part = "00"
    
    # Convert integer part to Thai text
    baht_text = ""
    if int(integer_part) > 0:
        baht_text = _convert_integer_to_thai(int(integer_part))
        baht_text += "บาท"
    
    # Convert decimal part to Thai text
    satang_text = ""
    if int(decimal_part) > 0:
        satang_text = _convert_integer_to_thai(int(decimal_part))
        satang_text += "สตางค์"
    else:
        satang_text = "ถ้วน"
    
    return baht_text + satang_text

def _convert_integer_to_thai(number):
    """
    Helper function to convert an integer to Thai text.
    
    Args:
        number (int): Integer to convert
        
    Returns:
        str: Thai text representation of the integer
    """
    # Dictionary for Thai number words
    thai_numbers = {
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
    }
    
    # Dictionary for Thai position words
    thai_positions = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"]
    
    # Handle zero
    if number == 0:
        return thai_numbers[0]
    
    # Convert to string for easier digit manipulation
    str_number = str(number)
    length = len(str_number)
    
    # Handle numbers greater than or equal to 10 million
    if length > 7:
        # Split into millions and remainder
        millions = number // 1000000
        remainder = number % 1000000
        
        millions_text = _convert_integer_to_thai(millions) + "ล้าน"
        
        if remainder == 0:
            return millions_text
        else:
            return millions_text + _convert_integer_to_thai(remainder)
    
    # Process each digit
    result = ""
    for i, digit in enumerate(str_number):
        position = length - i - 1
        digit_value = int(digit)
        
        # Skip zeros
        if digit_value == 0:
            continue
        
        # Special case for 1 in tens position
        if position == 1 and digit_value == 1:
            result += "สิบ"
        # Special case for 2 in tens position
        elif position == 1 and digit_value == 2:
            result += "ยี่สิบ"
        # Special case for 1 in ones position
        elif position == 0 and digit_value == 1 and length > 1:
            result += "เอ็ด"
        else:
            result += thai_numbers[digit_value] + thai_positions[position]
    
    return result

def gregorian_to_buddhist_era(date):
    """
    Convert a Gregorian calendar date to Buddhist Era date.
    Buddhist Era = Gregorian year + 543
    
    Args:
        date (datetime): Gregorian date to convert
        
    Returns:
        dict: Dictionary containing formatted date in Buddhist Era with keys:
              - 'year': Year in Buddhist Era (int)
              - 'month': Month number (int)
              - 'day': Day number (int)
              - 'thai_month': Month name in Thai (str)
              - 'thai_date': Full date in Thai format (str)
    """
    if not isinstance(date, datetime):
        raise TypeError("Input must be a datetime object")
    
    # Thai month names
    thai_months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ]
    
    # Convert year to Buddhist Era
    buddhist_year = date.year + 543
    
    # Get month and day
    month = date.month
    day = date.day
    
    # Get Thai month name
    thai_month = thai_months[month - 1]
    
    # Format full date in Thai format
    thai_date = f"{day} {thai_month} พ.ศ. {buddhist_year}"
    
    return {
        'year': buddhist_year,
        'month': month,
        'day': day,
        'thai_month': thai_month,
        'thai_date': thai_date
    }

def format_thai_date(date, include_weekday=False):
    """
    Format a datetime object as a Thai date string.
    
    Args:
        date (datetime): Date to format
        include_weekday (bool): Whether to include the weekday in the output
                               (Note: weekday functionality is commented out for normal use,
                                but still available for tests)
        
    Returns:
        str: Formatted Thai date string
    """
    if not isinstance(date, datetime):
        raise TypeError("Input must be a datetime")
    
    # Convert to Buddhist Era
    be_date = gregorian_to_buddhist_era(date)
    
    # For normal use, we don't include weekday as per requirements
    # But for tests, we need to support the include_weekday parameter
    if include_weekday:
        # Thai weekday names - in Python, weekday() returns 0 for Monday, 6 for Sunday
        # But we need to reorder them to match Thai calendar where Sunday is the first day
        thai_weekdays = [
            "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", 
            "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
        ]
        
        # Get weekday (0 is Monday in Python's datetime.weekday())
        weekday = date.weekday()
        # Convert to Thai calendar (Sunday is 0, Monday is 1, etc.)
        # Python: Monday=0, Sunday=6 -> Thai: Sunday=0, Monday=1
        thai_weekday_index = (weekday + 1) % 7
        thai_weekday = thai_weekdays[thai_weekday_index]
        return f"{thai_weekday}ที่ {be_date['day']} {be_date['thai_month']} พ.ศ. {be_date['year']}"
    else:
        return be_date['thai_date']
    
    # Note: The weekday functionality is kept for test compatibility,
    # but in normal application use, it should not be used as per requirements.