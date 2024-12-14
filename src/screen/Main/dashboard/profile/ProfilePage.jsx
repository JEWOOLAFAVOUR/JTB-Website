import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    // State for profile details
    const [profile, setProfile] = useState({
        firstName: "John",
        lastName: "Doe",
        channelName: "John's Channel"
    });

    // State for the modal form fields
    const [editProfile, setEditProfile] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        channelName: profile.channelName
    });

    // Handle input change
    const handleChange = (e) => {
        setEditProfile({
            ...editProfile,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submit (save changes)
    const handleSave = () => {
        setProfile(editProfile);  // Save the changes
        // Close the modal automatically after saving
    };

    return (
        <div className="p-6 space-y-6">
            {/* Profile Card */}
            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16" alt="Profile Avatar" />
                        <div>
                            <CardTitle className="text-2xl">{profile.firstName} {profile.lastName}</CardTitle>
                            <p className="text-sm text-muted-foreground">@{profile.channelName}</p>
                        </div>
                    </div>
                    {/* Edit Profile Button */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-4 sm:mt-0">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={editProfile.firstName}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={editProfile.lastName}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="channelName">Channel Name</Label>
                                    <Input
                                        id="channelName"
                                        name="channelName"
                                        value={editProfile.channelName}
                                        onChange={handleChange}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <Separator className="my-4" />
                            {/* Save Button */}
                            <Button variant="primary" onClick={handleSave} className="w-full">Save Changes</Button>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                {/* Profile Details */}
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <p><strong>First Name:</strong> {profile.firstName}</p>
                            <p><strong>Last Name:</strong> {profile.lastName}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Channel Information</h3>
                            <p><strong>Channel Name:</strong> @{profile.channelName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
