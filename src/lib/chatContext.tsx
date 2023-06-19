'use client';

import React, { createContext, useCallback, useReducer } from 'react';

type State = {
    /** Loading state */
    loading: boolean;
    messages: ChatGPTMessage[];
    /** Suggestions for the search bar */
    suggestions: string[];
    sendMessage: (newInput: string, updateUrl?: boolean) => void;
    reset: (initial: ChatGPTMessage[]) => void;
};

type Action =
    | { type: 'ADD_MESSAGE'; payload: ChatGPTMessage }
    | { type: 'RESET'; payload: ChatGPTMessage[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | {
          type: 'UPDATE_MESSAGE';
          payload: {
              id: number;
              content: string;
          };
      };

const initialState: State = {
    loading: false,
    messages: [],
    suggestions: ['Work history', 'Education', 'Hobbies'],
    sendMessage: () => {
        console.log('sendMessage not implemented');
    },
    reset: () => {
        console.log('reset not implemented');
    },
};

const ChatContext = createContext<State>(initialState);

export const useChat = () => React.useContext(ChatContext);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'RESET':
            return {
                ...initialState,
                messages: action.payload,
            };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                messages: state.messages.map((message, index) => {
                    if (index === action.payload.id) {
                        return {
                            ...message,
                            content: action.payload.content,
                        };
                    }
                    return message;
                }),
            };
        default:
            return state;
    }
};

export function ChatProvider({
    children,
    initialChat,
}: {
    children: React.ReactNode;
    initialChat?: ChatGPTMessage[];
}) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        messages: initialChat || [],
    });

    const sendMessage = useCallback(
        async (newInput: string) => {
            const newQuery = newInput.trim();
            if (newQuery === '') return;

            dispatch({ type: 'SET_LOADING', payload: true });

            dispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    content: newInput,
                    role: 'user',
                },
            });

            dispatch({
                type: 'ADD_MESSAGE',
                payload: {
                    content: '',
                    role: 'assistant',
                },
            });

            const id = state.messages.length + 1;

            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    body: JSON.stringify({
                        query: newQuery,
                        messages: state.messages,
                    }),
                });

                if (!response.body) {
                    throw new Error('No response body');
                }

                const reader = response.body.getReader();
                let accumulatedResponse = '';

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        if (value) {
                            const decoded = new TextDecoder().decode(value);
                            accumulatedResponse += decoded;
                            dispatch({
                                type: 'UPDATE_MESSAGE',
                                payload: {
                                    content: accumulatedResponse,
                                    id,
                                },
                            });
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: 'ADD_MESSAGE',
                    payload: {
                        content: `Error: ${error}`,
                        role: 'assistant',
                    },
                });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        },
        [state.messages]
    );

    const reset = (initial: ChatGPTMessage[]) => {
        dispatch({ type: 'RESET', payload: initial });
    };

    return (
        <ChatContext.Provider
            value={{
                loading: state.loading,
                messages: state.messages,
                suggestions: state.suggestions,
                sendMessage,
                reset,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContext;
