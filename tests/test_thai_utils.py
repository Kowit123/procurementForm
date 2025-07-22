"""
Tests for Thai language utilities.
"""

import pytest
import sys
import os

# Add the parent directory to the path so we can import the utils module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.thai_utils import num_to_thai_text, gregorian_to_buddhist_era, format_thai_date
from datetime import datetime

# These tests will be implemented in tasks 2.1 and 2.2
def test_num_to_thai_text():
    """Test the conversion of numbers to Thai text."""
    # Test zero
    assert num_to_thai_text(0) == "ศูนย์บาทถ้วน"
    
    # Test single digits
    assert num_to_thai_text(1) == "หนึ่งบาทถ้วน"
    assert num_to_thai_text(5) == "ห้าบาทถ้วน"
    assert num_to_thai_text(9) == "เก้าบาทถ้วน"
    
    # Test teens
    assert num_to_thai_text(10) == "สิบบาทถ้วน"
    assert num_to_thai_text(11) == "สิบเอ็ดบาทถ้วน"
    assert num_to_thai_text(19) == "สิบเก้าบาทถ้วน"
    
    # Test tens
    assert num_to_thai_text(20) == "ยี่สิบบาทถ้วน"
    assert num_to_thai_text(21) == "ยี่สิบเอ็ดบาทถ้วน"
    assert num_to_thai_text(99) == "เก้าสิบเก้าบาทถ้วน"
    
    # Test hundreds
    assert num_to_thai_text(100) == "หนึ่งร้อยบาทถ้วน"
    assert num_to_thai_text(101) == "หนึ่งร้อยเอ็ดบาทถ้วน"
    assert num_to_thai_text(999) == "เก้าร้อยเก้าสิบเก้าบาทถ้วน"
    
    # Test thousands
    assert num_to_thai_text(1000) == "หนึ่งพันบาทถ้วน"
    assert num_to_thai_text(1001) == "หนึ่งพันเอ็ดบาทถ้วน"
    assert num_to_thai_text(9999) == "เก้าพันเก้าร้อยเก้าสิบเก้าบาทถ้วน"
    
    # Test ten thousands
    assert num_to_thai_text(10000) == "หนึ่งหมื่นบาทถ้วน"
    assert num_to_thai_text(10001) == "หนึ่งหมื่นเอ็ดบาทถ้วน"
    assert num_to_thai_text(99999) == "เก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าบาทถ้วน"
    
    # Test hundred thousands
    assert num_to_thai_text(100000) == "หนึ่งแสนบาทถ้วน"
    assert num_to_thai_text(100001) == "หนึ่งแสนเอ็ดบาทถ้วน"
    assert num_to_thai_text(999999) == "เก้าแสนเก้าหมื่นเก้าพันเก้าร้อยเก้าสิบเก้าบาทถ้วน"
    
    # Test millions
    assert num_to_thai_text(1000000) == "หนึ่งล้านบาทถ้วน"
    assert num_to_thai_text(1000001) == "หนึ่งล้านเอ็ดบาทถ้วน"
    
    # Test large numbers
    assert num_to_thai_text(1234567) == "หนึ่งล้านสองแสนสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน"
    assert num_to_thai_text(10000000) == "สิบล้านบาทถ้วน"
    assert num_to_thai_text(100000000) == "หนึ่งร้อยล้านบาทถ้วน"
    
    # Test decimal numbers
    assert num_to_thai_text(1.5) == "หนึ่งบาทห้าสิบสตางค์"
    assert num_to_thai_text(1.05) == "หนึ่งบาทห้าสตางค์"
    assert num_to_thai_text(1.00) == "หนึ่งบาทถ้วน"
    assert num_to_thai_text(1234.56) == "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์"
    
    # Test negative numbers
    assert num_to_thai_text(-1) == "ลบหนึ่งบาทถ้วน"
    assert num_to_thai_text(-1234.56) == "ลบหนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์"

def test_gregorian_to_buddhist_era():
    """Test the conversion of Gregorian dates to Buddhist Era."""
    # Test basic conversion
    date = datetime(2023, 1, 15)
    result = gregorian_to_buddhist_era(date)
    
    assert result['year'] == 2566  # 2023 + 543
    assert result['month'] == 1
    assert result['day'] == 15
    assert result['thai_month'] == "มกราคม"
    assert result['thai_date'] == "15 มกราคม พ.ศ. 2566"
    
    # Test different months
    date = datetime(2023, 4, 1)
    result = gregorian_to_buddhist_era(date)
    assert result['thai_month'] == "เมษายน"
    assert result['thai_date'] == "1 เมษายน พ.ศ. 2566"
    
    date = datetime(2023, 12, 31)
    result = gregorian_to_buddhist_era(date)
    assert result['thai_month'] == "ธันวาคม"
    assert result['thai_date'] == "31 ธันวาคม พ.ศ. 2566"
    
    # Test different years
    date = datetime(2000, 1, 1)
    result = gregorian_to_buddhist_era(date)
    assert result['year'] == 2543  # 2000 + 543
    
    date = datetime(2025, 7, 22)
    result = gregorian_to_buddhist_era(date)
    assert result['year'] == 2568  # 2025 + 543
    assert result['thai_date'] == "22 กรกฎาคม พ.ศ. 2568"
    
    # Test error handling
    with pytest.raises(TypeError):
        gregorian_to_buddhist_era("not a datetime")

def test_format_thai_date():
    """Test the formatting of Thai dates."""
    # Test without weekday
    date = datetime(2023, 1, 15)
    result = format_thai_date(date)
    assert result == "15 มกราคม พ.ศ. 2566"
    
    # Test with weekday (January 15, 2023 was a Sunday)
    result = format_thai_date(date, include_weekday=True)
    assert result == "วันอาทิตย์ที่ 15 มกราคม พ.ศ. 2566"
    
    # Test different weekday (July 22, 2025 will be a Tuesday)
    date = datetime(2025, 7, 22)
    result = format_thai_date(date, include_weekday=True)
    assert result == "วันอังคารที่ 22 กรกฎาคม พ.ศ. 2568"
    
    # Test error handling
    with pytest.raises(TypeError):
        format_thai_date("not a datetime")