// ChatHistoryList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import {ChatHistoryList} from './ChatHistoryList';
import { AppStateContext } from '../../state/AppProvider';
import { Conversation,ChatHistoryLoadingState } from '../../api/models';

// Mock the ChatHistoryListItemGroups component
const mockDispatch = jest.fn();

jest.mock('./ChatHistoryListItem', () => ({
  ChatHistoryListItemGroups: () => <div>Chat History List Item Groups</div>,
}));


const mockState = {
    chatHistory: [] as Conversation[],
    isCosmosDBAvailable: { cosmosDB: true , status : "success"},
    isChatHistoryOpen: true,
    filteredChatHistory: [],
    currentChat: null,
    frontendSettings: {},
    feedbackState: {},
    clientId: '',
    isRequestInitiated : false,
    isLoader: false,
    chatHistoryLoadingState :  ChatHistoryLoadingState.Loading

  }
 

const renderWithContext = (contextValue: typeof mockState) => {
  return render(
    <AppStateContext.Provider value={{state:contextValue , dispatch: mockDispatch}}>
      <ChatHistoryList />
    </AppStateContext.Provider>
  );
};

describe('ChatHistoryList', () => {
  it('renders a message when there is no chat history', () => {
    renderWithContext(mockState);
    expect(screen.getByText(/No chat history/i)).toBeInTheDocument();
  });

  it('renders ChatHistoryListItemGroups when chat history is provided', () => {
    const chatHistory: Conversation[] = [
      // Populate with sample data
      {
        id: '1',
        title: 'Sample chat message',
        messages:[],
        date:new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    renderWithContext({  ...mockState, chatHistory : chatHistory });
    expect(screen.getByText(/Chat History List Item Groups/i)).toBeInTheDocument();
  });

});
