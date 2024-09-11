import { render, screen, fireEvent, waitFor, logRoles,act } from '@testing-library/react';
import { ChatHistoryListItemCell } from './ChatHistoryListItemCell';
import { AppStateContext } from '../../state/AppProvider';
import { historyDelete, historyRename } from '../../api';
import { Conversation,ChatHistoryLoadingState } from '../../api/models';
import userEvent from '@testing-library/user-event';
import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons();
// Mock API functions
// jest.mock('../../api', () => ({
//   historyDelete: jest.fn(),
//   historyRename: jest.fn(),
// }));

// Sample item for testing
const mockItem: Conversation = {
    id: '1',
    title: 'Sample chat message',
    messages:[],
    date:new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

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

// Mock context values
const mockContextValue = {
  state: {
    ...mockState,
    currentChat: mockItem,
    isRequestInitiated: false,
  },
  dispatch: jest.fn(),
};

describe('ChatHistoryListItemCell', () => {

    beforeEach(() => {
    jest.clearAllMocks()
    })

  test('renders without crashing', () => {
    const view = render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
      </AppStateContext.Provider>
    );
    //logRoles(view.container)
    expect(screen.getByRole('title')).toBeInTheDocument();
  });

  test('enters edit mode and handles changes', async () => {


    const view = render(
        <AppStateContext.Provider value={mockContextValue}>
          <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
        </AppStateContext.Provider>
      )
  
      // Simulate clicking on Edit button
      const editButton = screen.getByTitle('Edit')
      //userEvent.click(editButton)
  
      await act( async()=>{
         await userEvent.click(editButton);
        });
    
      const input = screen.getByPlaceholderText(mockItem.title)
      
      logRoles(view.container)
      await act( async()=>{
        await userEvent.type(input, 'New Chat Title')
        });
  
      // Simulate saving
      const saveButton = screen.getByLabelText('confirm new title')
      userEvent.click(saveButton);

      
  
      // Assert that the title is updated after the API call
      await waitFor(() =>
        expect(screen.queryByPlaceholderText('New Chat Title')).not.toBeInTheDocument()
      )
  
      // Ensure dispatch is called to update the chat title
      await waitFor(() =>
        expect(mockContextValue.dispatch).toHaveBeenCalledWith({
          type: 'UPDATE_CHAT_TITLE',
          payload: { id: mockItem.id, title: 'New Chat Title' },
        })
      )


    /*
    render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
      </AppStateContext.Provider>
    );

    const editButton = screen.getByTitle('Edit');
    
    await act( async()=>{
        await userEvent.click(editButton);
    });

    const textField = screen.getByPlaceholderText(mockItem.title);
    userEvent.clear(textField);
    userEvent.type(textField, 'New Title');

    screen.debug();
    await waitFor( async () => {
    const checkButton = screen.getByLabelText('confirm new title');
    screen.debug();

        await userEvent.click(checkButton);
    })



    */

    
    // await waitFor(() => {
    //   expect(historyRename).toHaveBeenCalledWith(mockItem.id, 'New Title');
    // });

  });
/*
  test('shows error message if rename fails', async () => {
    (historyRename as jest.Mock).mockResolvedValueOnce({ ok: false });

    render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
      </AppStateContext.Provider>
    );

    const editButton = screen.getByTitle('Edit');
    userEvent.click(editButton);

    const textField = screen.getByPlaceholderText(mockItem.title);
    userEvent.clear(textField);
    userEvent.type(textField, 'New Title');
    
    const checkButton = screen.getByLabelText('confirm new title');
    userEvent.click(checkButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Error: could not rename item');
    });
  });

  test('handles delete functionality', async () => {
    (historyDelete as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
      </AppStateContext.Provider>
    );

    const deleteButton = screen.getByTitle('Delete');
    userEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByText('Delete');
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(historyDelete).toHaveBeenCalledWith(mockItem.id);
      expect(mockContextValue.dispatch).toHaveBeenCalledWith({ type: 'DELETE_CHAT_ENTRY', payload: mockItem.id });
    });
  });

  test('handles error message if delete fails', async () => {
    (historyDelete as jest.Mock).mockResolvedValueOnce({ ok: false });

    render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={jest.fn()} />
      </AppStateContext.Provider>
    );

    const deleteButton = screen.getByTitle('Delete');
    userEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByText('Delete');
    userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(screen.getByText('Error: could not delete item')).toBeInTheDocument();
    });
  });

  test('handles selection of an item', () => {
    const handleSelect = jest.fn();

    render(
      <AppStateContext.Provider value={mockContextValue}>
        <ChatHistoryListItemCell item={mockItem} onSelect={handleSelect} />
      </AppStateContext.Provider>
    );

    const itemCell = screen.getByRole('listitem');
    userEvent.click(itemCell);

    expect(handleSelect).toHaveBeenCalledWith(mockItem);
    expect(mockContextValue.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_CHAT', payload: mockItem });
  });
  */
});
