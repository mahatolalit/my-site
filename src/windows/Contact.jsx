import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useState, useRef } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [hcaptchaToken, setHcaptchaToken] = useState("");
    const hcaptchaRef = useRef(null);

    const onHCaptchaChange = (token) => {
        setHcaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!hcaptchaToken) {
            alert("Please complete the hCaptcha verification.");
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "04174d40-10e8-4103-af4f-e5772cf5d2a9", // Get this from web3forms.com
                    ...formData,
                    "h-captcha-response": hcaptchaToken
                }),
            });
            
            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setHcaptchaToken("");
                if (hcaptchaRef.current) {
                    hcaptchaRef.current.resetCaptcha();
                }
                // Reset success message after 3 seconds
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                console.error("Error:", result);
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="h-full flex flex-col bg-white w-full rounded-xl overflow-hidden">
            {/* Header */}
            <div id="window-header" className="bg-[#f3f4f6] px-4 py-3 flex items-center border-b border-[#e5e7eb] shrink-0">
                <WindowControls target="contact" />
                <div className="flex-1 text-center font-medium text-gray-700 -ml-14">Contact Me</div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-12 flex flex-col items-center bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <div className="text-center mb-6">
                        <div className="bg-blue-100 p-3 rounded-full inline-flex mb-3">
                            <Mail size={24} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
                        <p className="text-gray-500 text-sm mt-1">Send me a message and I'll get back to you!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                                    placeholder="youremail@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <div className="relative">
                                <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all resize-none"
                                    placeholder="What's on your mind?"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center my-4">
                            <HCaptcha
                                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                                onVerify={onHCaptchaChange}
                                ref={hcaptchaRef}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className={`w-full py-2.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all
                                ${status === "success" 
                                    ? "bg-green-500 hover:bg-green-600" 
                                    : status === "error"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5 active:translate-y-0"
                                }
                                ${status === "submitting" ? "opacity-75 cursor-wait" : ""}
                            `}
                        >
                            {status === "submitting" ? (
                                "Sending..."
                            ) : status === "success" ? (
                                "Message Sent!"
                            ) : status === "error" ? (
                                "Failed to Send"
                            ) : (
                                <>
                                    Send Message <Send size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
