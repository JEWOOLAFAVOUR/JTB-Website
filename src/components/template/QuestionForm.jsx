import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['formula'],
    ],
};

const QuestionForm = ({ question, index, onUpdate, onRemove, onCancel }) => {
    const [localQuestion, setLocalQuestion] = useState(question);

    useEffect(() => {
        setLocalQuestion(question);
    }, [question]);

    const handleChange = (field, value) => {
        setLocalQuestion(prev => ({ ...prev, [field]: value }));
    };

    const handleOptionChange = (optionIndex, value) => {
        const newOptions = [...localQuestion.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
        handleChange('options', newOptions);
    };

    const handleSubmit = () => {
        onUpdate(localQuestion);
    };

    return (
        <div className="mb-8 p-4 border rounded-lg relative">
            {onRemove && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={onRemove}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}

            <div className="mb-4">
                <label className="block mb-2 font-medium">Question {index !== undefined ? index + 1 : ''}</label>
                <ReactQuill
                    value={localQuestion.question}
                    onChange={(value) => handleChange('question', value)}
                    modules={modules}
                />
            </div>

            {localQuestion.options.map((option, oIndex) => (
                <div key={oIndex} className="mb-4">
                    <label className="block mb-2 font-medium">
                        Option {String.fromCharCode(65 + oIndex)}
                    </label>
                    <ReactQuill
                        value={option.text}
                        onChange={(value) => handleOptionChange(oIndex, value)}
                        modules={modules}
                    />
                </div>
            ))}

            <div className="mb-4">
                <label className="block mb-2 font-medium">Correct Answer</label>
                <select
                    value={localQuestion.correctAnswer}
                    onChange={(e) => handleChange('correctAnswer', parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select correct answer</option>
                    {localQuestion.options.map((option) => (
                        <option key={option.index} value={option.index}>
                            {String.fromCharCode(64 + option.index)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Explanation</label>
                <ReactQuill
                    value={localQuestion.correction}
                    onChange={(value) => handleChange('correction', value)}
                    modules={modules}
                />
            </div>

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button onClick={handleSubmit}>
                    {localQuestion._id ? 'Update' : 'Add'} Question
                </Button>
            </div>
        </div>
    );
};

export default QuestionForm;

