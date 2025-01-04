import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CourseCodeForm = ({ onSubmit, initialData = {}, onFormDataChange }) => {
    const [localFormData, setLocalFormData] = useState({
        name: initialData.name || '',
        code: initialData.code || '',
        semester: initialData.semester || 'first',
        level: initialData.level || []
    });

    const debouncedSetFormData = useCallback(
        debounce((newValue) => {
            onFormDataChange(newValue);
        }, 300),
        [onFormDataChange]
    );

    const handleInputChange = (field) => (e) => {
        const newValue = {
            ...localFormData,
            [field]: e.target.value
        };
        setLocalFormData(newValue);
        debouncedSetFormData(newValue);
    };

    const handleLevelToggle = (level) => {
        const newLevels = localFormData.level.includes(level)
            ? localFormData.level.filter(l => l !== level)
            : [...localFormData.level, level];

        const newValue = {
            ...localFormData,
            level: newLevels
        };

        setLocalFormData(newValue);
        debouncedSetFormData(newValue);
    };

    const handleSemesterChange = (value) => {
        const newValue = {
            ...localFormData,
            semester: value
        };
        setLocalFormData(newValue);
        debouncedSetFormData(newValue);
    };

    const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"];

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Course Name</Label>
                <Input
                    id="name"
                    value={localFormData.name}
                    onChange={handleInputChange('name')}
                    className="col-span-3"
                    placeholder="Introduction to Biology"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Course Code</Label>
                <Input
                    id="code"
                    value={localFormData.code}
                    onChange={handleInputChange('code')}
                    className="col-span-3"
                    placeholder="BIO 101"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="semester" className="text-right">Semester</Label>
                <Select
                    value={localFormData.semester}
                    onValueChange={handleSemesterChange}
                >
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="first">First</SelectItem>
                        <SelectItem value="second">Second</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Level</Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                    {levels.map((level) => (
                        <Button
                            key={level}
                            variant={localFormData.level.includes(level) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleLevelToggle(level)}
                        >
                            {level}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="flex justify-end">
                <Button onClick={() => onSubmit(localFormData)}>Save Course Code</Button>
            </div>
        </div>
    );
};

export default CourseCodeForm;

