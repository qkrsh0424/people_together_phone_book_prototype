package com.example.skeleton.service.handler;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class DateService {
    public Date getCurrentDate(){
        Calendar currentCalendar = Calendar.getInstance();
        Date currentDate = currentCalendar.getTime();
        return currentDate;
    }
}
