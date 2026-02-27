import React, { useState, useEffect, useRef } from 'react';
import memoryService from '../services/memoryService';
import { Send } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'agent', text: 'Hi! I am your Continuous Energy Consultant. What times of day is your home usually empty?' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMsg = { id: Date.now(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, newMsg]);

        // "Remember" the fact
        memoryService.store({ text: inputText, metadata: { source: 'chat_conversation' } });

        setInputText('');

        // Simulate agent thinking and responding contextually
        setTimeout(() => {
            let responseText = "Got it. I've updated your lifestyle profile.";

            // Simple keyword-based mock intelligence
            const textLower = newMsg.text.toLowerCase();
            if (textLower.includes('8') || textLower.includes('morning') || textLower.includes('night')) {
                responseText += " Knowing your schedule helps me suggest non-torturous ways to shift your energy load.";
            } else if (textLower.includes('cook') || textLower.includes('oven')) {
                responseText += " Cooking habits are a major factor. I'll remind you to charge devices before load shedding hits during dinner time.";
            } else if (textLower.includes('short') || textLower.includes('run out')) {
                responseText = "I see you're worried about your budget. Survival Plan: If you skip the tumble dryer this weekend and halve pool pump hours, you'll make it to payday.";
            }

            setMessages(prev => [...prev, { id: Date.now(), sender: 'agent', text: responseText }]);
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="header">Energy Consultant</div>
            <div className="sub-header">Continuous lifestyle-aware savings advice.</div>

            <div className="content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '5rem', overflowY: 'auto' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.sender === 'user' ? '#1E293B' : '#F1F5F9',
                                color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                                padding: '0.75rem 1rem',
                                borderRadius: '1rem',
                                borderBottomRightRadius: msg.sender === 'user' ? '0.25rem' : '1rem',
                                borderBottomLeftRadius: msg.sender === 'agent' ? '0.25rem' : '1rem',
                                maxWidth: '80%',
                                fontSize: '0.875rem',
                                lineHeight: '1.4'
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div style={{
                position: 'fixed',
                bottom: '80px', // Above the navigation bar
                left: 0,
                right: 0,
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 10
            }}>
                <input
                    type="text"
                    className="input-field"
                    style={{ flex: 1 }}
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSend}
                    style={{ padding: '0.5rem 1rem' }}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default Chat;