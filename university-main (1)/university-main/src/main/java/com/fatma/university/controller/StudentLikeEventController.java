package com.fatma.university.controller;

import com.fatma.university.model.dto.StudentLikeEventResponse;
import com.fatma.university.service.StudentLikeEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/studentLikeEvent")
@CrossOrigin("*")

public class StudentLikeEventController {
    @Autowired
    private StudentLikeEventService studentLikeEventService;
    @PostMapping("/putLikeToEvent/{studentId}/{eventId}")
    public StudentLikeEventResponse putLikeToPost(@PathVariable long studentId, @PathVariable long eventId) {
        return studentLikeEventService.putLikeToEvent(studentId,eventId);
    }
}
