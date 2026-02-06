"use client"

import { Button } from "@/components/ui/Button"
import { toast } from "sonner"
import { useNativeNotification } from "@/hooks/use-native-notification"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle2, AlertCircle, Info, ExternalLink } from "lucide-react"

export default function NotificationsDemo() {
    const { permission, requestPermission, sendNotification, isSupported } = useNativeNotification()

    const handleNativeNotification = () => {
        sendNotification("Hello from Mentii!", {
            body: "This is a native browser notification. Even if you tab away, you'll see this!",
            icon: "/favicon.ico", // Assuming a favicon exists, or just omit
        })
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl space-y-8">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Notification System</h1>
                <p className="text-muted-foreground text-lg">
                    Demonstrating both in-app toasts (using Sonner) and native browser notifications.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* In-App Toasts Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            In-App Toasts
                        </CardTitle>
                        <CardDescription>
                            Beautiful, stacked notifications for application state and feedback.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <Button
                                variant="outline"
                                onClick={() => toast("Event has been created", {
                                    description: "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })}
                            >
                                Default Toast
                            </Button>

                            <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => toast.success("Success!", {
                                    description: "Your changes have been saved successfully.",
                                })}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Success Toast
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => toast.error("Error", {
                                    description: "Something went wrong. Please try again.",
                                })}
                            >
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Error Toast
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => {
                                    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
                                    toast.promise(promise, {
                                        loading: 'Loading...',
                                        success: () => {
                                            return `Data has been added`;
                                        },
                                        error: 'Error',
                                    });
                                }}
                            >
                                Promise Toast
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Native Browser Notifications Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Native Notifications
                        </CardTitle>
                        <CardDescription>
                            System-level notifications that work even when the tab is backgrounded.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <span className="text-sm font-medium">Permission Status:</span>
                            <span className={`text-sm font-bold px-2 py-1 rounded ${permission === 'granted' ? 'bg-green-100 text-green-700' :
                                permission === 'denied' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                {permission.toUpperCase()}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={requestPermission}
                                disabled={permission === 'granted' || !isSupported}
                            >
                                {permission === 'granted' ? 'Permission Granted' : 'Request Permission'}
                            </Button>

                            <Button
                                className="w-full"
                                onClick={handleNativeNotification}
                                disabled={permission !== 'granted'}
                            >
                                Send Test Notification
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {!isSupported && (
                            <p className="text-xs text-red-500">
                                Your browser does not support native notifications.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
