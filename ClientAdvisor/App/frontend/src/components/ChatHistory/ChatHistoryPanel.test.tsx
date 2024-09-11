import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
//import { act } from '@testing-library/react';
//import { setupServer } from 'msw/node'
import { http } from 'msw'
import { ChatHistoryPanel, ChatHistoryPanelTabs } from './ChatHistoryPanel'
import { AppStateContext } from '../../state/AppProvider'
//import { server } from '../../mocks/server';
//import { historyDeleteAll } from '../../api'

// Mocking API responses
// const server = setupServer(
//   rest.delete('/history/delete_all', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ ok: true }));
//   })
// )

jest.mock('./ChatHistoryList', () => ({
  ChatHistoryList: jest.fn(() => <div data-testid="mocked-chat-history-list">Mocked ChatHistoryList</div>)
}))

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

const renderComponent = (appState: any) => {
  return render(
    <AppStateContext.Provider value={{ state: appState, dispatch: jest.fn() }}>
      <ChatHistoryPanel isLoading={false} />
    </AppStateContext.Provider>
  )
}

describe('ChatHistoryPanel Component', () => {
  test('should render loading state when isLoading is true', () => {
    const appState = {
      chatHistoryLoadingState: 'loading',
      isCosmosDBAvailable: { cosmosDB: true }
    }
    renderComponent(appState)
    
    expect(screen.getByText('Loading chat history')).toBeInTheDocument()
  })

  test('is emp' , async()=>{
    const appState = {
      chatHistoryLoadingState: 'success',
      chatHistory: [],
      isCosmosDBAvailable: { cosmosDB: true }
    }
    renderComponent(appState);
    const users = await screen.findAllByRole('listitem');
    expect(users).toHaveLength(3)
  })

  /*
  test('should display error message when chat history fails to load', () => {
    const appState = {
      chatHistoryLoadingState: 'fail',
      isCosmosDBAvailable: { status: false }
    }
    renderComponent(appState)

    expect(screen.getByText("Error loading chat history")).toBeInTheDocument()
    expect(screen.getByText("Chat history can't be saved at this time")).toBeInTheDocument()
  })

  test('should show "clear all" contextual menu when clicking on more button', async () => {
    const appState = {
      chatHistoryLoadingState: 'success',
      chatHistory: [],
      isCosmosDBAvailable: { cosmosDB: true }
    }
    renderComponent(appState)
    
    const moreButton = screen.getByRole('clearAll', { name: 'clear all chat history' })
    userEvent.click(moreButton)

    await waitFor(() => {
      expect(screen.getByText('Clear all chat history')).toBeInTheDocument()
    })
  })

  test('should open "Clear All" confirmation dialog when clear all menu item clicked', async () => {
    const appState = {
      chatHistoryLoadingState: 'success',
      chatHistory: [{
        id: '1',
        title: 'Sample chat message',
        messages:[],
        date:new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }],
      isCosmosDBAvailable: { cosmosDB: true }
    }
    renderComponent(appState)
    // Trigger contextual menu by clicking the "More" button
    const moreButton = screen.getByRole('clearAll', { name: 'clear all chat history' })
    userEvent.click(moreButton)
    //screen.debug();
    // Find and click the "Clear all chat history" menu item
    const clearAllItem = await screen.findByRole('menuitem')
    //screen.debug(clearAllItem);
    await act (async()=>{
        userEvent.click(clearAllItem)
    })
    //screen.debug();
    // Wait for the dialog to appear
    await waitFor(() => {
      const dialogItem = screen.getByRole('alertdialog')
      expect(dialogItem).toBeInTheDocument()
    })

    // Verify the dialog contains the correct text
    expect(screen.getByText('Are you sure you want to clear all chat history?')).toBeInTheDocument()
  })

  test.skip('should clear chat history on confirm', async () => {
    const appState = {
      chatHistoryLoadingState: 'Success',
      chatHistory: [{ id: 1, text: 'Test message' }],
      isCosmosDBAvailable: { cosmosDB: true }
    }

    renderComponent(appState)
    // Trigger contextual menu by clicking the "More" button
    const moreButton = screen.getByRole('clearAll', { name: 'clear all chat history' })
    userEvent.click(moreButton)
    //screen.debug();
    // Find and click the "Clear all chat history" menu item
    const clearAllItem = await screen.findByRole('menuitem')
   // screen.debug(clearAllItem);
    await act (async()=>{
       userEvent.click(clearAllItem)
    })
   // screen.debug();
    // Wait for the dialog to appear
    let confirmButton : any = null;
    await waitFor(() => {
      // const dialogItem = screen.getByRole('alertdialog')
      // expect(dialogItem).toBeInTheDocument()
      confirmButton = screen.getByText('Clear All')
  });

  await act (async()=>{
      userEvent.click(confirmButton)
    });

    await waitFor(() => {
      expect(screen.queryByText('All chat history will be permanently removed')).not.toBeInTheDocument()
    })

  })

  
  test('should show error in dialog when API fails to delete chat history', async () => {
    server.use(
      rest.delete('/history/delete_all', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const appState = {
      chatHistoryLoadingState: 'Success',
      chatHistory: [{ id: 1, text: 'Test message' }],
      isCosmosDBAvailable: { cosmosDB: true }
    }
    renderComponent(appState)

    const moreButton = screen.getByRole('clearAll', { name: 'clear all chat history' })
    userEvent.click(moreButton)

    // const clearAllItem = await screen.findByText('Clear all chat history')
    // userEvent.click(clearAllItem)

    const clearAllItem = await screen.findByRole('menuitem')
    // screen.debug(clearAllItem);
     await act (async()=>{
        userEvent.click(clearAllItem)
     })
     await waitFor(() => {
    const confirmButton = screen.getByText('Clear All')
    //userEvent.click(confirmButton)

       act (async()=>{
      userEvent.click(confirmButton)
    });
  });
  screen.debug()
    await waitFor(() => {
      expect(screen.getByText('Error deleting all of chat history')).toBeInTheDocument()
    })
  })
    */
})
