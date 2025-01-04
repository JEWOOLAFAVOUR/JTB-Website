import React, { useState, useEffect, useCallback } from 'react';
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
import { fetchUniversity, searchCourseCode } from '../../api/auth';

const CourseForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        course_code: initialData?.course_code?._id || '',
        semester: initialData?.semester || 'first',
        university: initialData?.university?._id || '',
        ...initialData
    });
    const [courseCodes, setCourseCodes] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Initialize courseCodes with the existing course_code if it exists
    useEffect(() => {
        if (initialData?.course_code) {
            setCourseCodes([initialData.course_code]);
            setSearchTerm(`${initialData.course_code.code} - ${initialData.course_code.name}`);
        }
    }, [initialData]);

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const { data } = await fetchUniversity();
            if (data?.success) {
                setUniversities(data.data);
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
        }
    };

    const debouncedSearch = useCallback(
        debounce(async (search) => {
            // Don't search if we're showing an existing course code and haven't modified the search
            if (initialData?.course_code &&
                search === `${initialData.course_code.code} - ${initialData.course_code.name}`) {
                return;
            }

            if (search.length > 2) {
                setIsLoading(true);
                setError('');
                try {
                    const { data } = await searchCourseCode(search);
                    if (data?.success && Array.isArray(data.data)) {
                        setCourseCodes(data.data);
                    } else {
                        setCourseCodes([]);
                        setError('No course codes found');
                    }
                } catch (error) {
                    console.error('Error searching course codes:', error);
                    setError('Failed to fetch course codes');
                    setCourseCodes([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCourseCodes([]);
            }
        }, 300),
        [initialData]
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="course_code">Course Code</Label>
                <div className="flex flex-col space-y-2">
                    <Input
                        type="text"
                        placeholder="Search course code..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Select
                        value={formData.course_code}
                        onValueChange={(value) => {
                            const selectedCourse = courseCodes.find(c => c._id === value);
                            setFormData({
                                ...formData,
                                course_code: value,
                                // Update search term to reflect selection
                                searchTerm: selectedCourse ?
                                    `${selectedCourse.code} - ${selectedCourse.name}` :
                                    searchTerm
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course code">
                                {initialData?.course_code ?
                                    `${initialData.course_code.code} - ${initialData.course_code.name}` :
                                    "Select a course code"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {isLoading ? (
                                <SelectItem value="loading" disabled>Loading...</SelectItem>
                            ) : courseCodes.length > 0 ? (
                                courseCodes.map((courseCode) => (
                                    <SelectItem key={courseCode._id} value={courseCode._id}>
                                        {courseCode.code} - {courseCode.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="no-results" disabled>
                                    {initialData?.course_code ?
                                        `${initialData.course_code.code} - ${initialData.course_code.name}` :
                                        "No results found"}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="semester">Semester</Label>
                <Select
                    value={formData.semester}
                    onValueChange={(value) => setFormData({ ...formData, semester: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a semester" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="first">First</SelectItem>
                        <SelectItem value="second">Second</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="university">University</Label>
                <Select
                    value={formData.university}
                    onValueChange={(value) => setFormData({ ...formData, university: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a university" />
                    </SelectTrigger>
                    <SelectContent>
                        {universities.map((university) => (
                            <SelectItem key={university._id} value={university._id}>
                                {university.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit">
                {initialData._id ? 'Update Course' : 'Create Course'}
            </Button>
        </form>
    );
};

export default CourseForm;
