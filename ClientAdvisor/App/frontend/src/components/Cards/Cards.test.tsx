import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Cards from './Cards'
import { getUsers } from '../../api/api'
import { AppStateContext } from '../../state/AppProvider'
import { http, HttpResponse } from 'msw'
import { handlers } from '../../mocks/handlers'
import { server } from '../../mocks/server'

// jest.mock('../../api/api')

const mockDispatch = jest.fn()
const mockOnCardClick = jest.fn()

// const defaultProps = [
//   {
//     ClientId: 1,
//     ClientName: 'John Doe',
//     NextMeeting: 'Meeting 1',
//     NextMeetingTime: '10:00 AM',
//     NextMeetingEndTime: '11:00 AM',
//     AssetValue: '1000',
//     LastMeeting: 'Previous Meeting 1',
//     LastMeetingStartTime: '09:00 AM',
//     LastMeetingEndTime: '10:00 AM',
//     ClientSummary: 'Summary of the client 1',
//     chartUrl: ''
//   },
//   {
//     ClientId: 2,
//     ClientName: 'Steve Doe',
//     NextMeeting: 'Meeting 2',
//     NextMeetingTime: '10:00 AM',
//     NextMeetingEndTime: '11:00 AM',
//     AssetValue: '1000',
//     LastMeeting: 'Previous Meeting 2',
//     LastMeetingStartTime: '09:00 AM',
//     LastMeetingEndTime: '10:00 AM',
//     ClientSummary: 'Summary of the client 2',
//     chartUrl: ''
//   },
//   {
//     ClientId: 3,
//     ClientName: 'James',
//     NextMeeting: 'Meeting 3',
//     NextMeetingTime: '10:00 AM',
//     NextMeetingEndTime: '11:00 AM',
//     AssetValue: '1000',
//     LastMeeting: 'Previous Meeting 3',
//     LastMeetingStartTime: '09:00 AM',
//     LastMeetingEndTime: '10:00 AM',
//     ClientSummary: 'Summary of the client 3',
//     chartUrl: ''
//   }
// ]

// const mockUsers = [defaultProps]
// const initialState: AppState = {
//   isChatHistoryOpen: false,
//   chatHistoryLoadingState: 'idle',
//   isCosmosDBAvailable: true,
//   chatHistory: [],
//   cosmosDBMessage: '',
//   lastUpdated: '',
//   cosmosDBStatus: '',
//   activeUserId: null,
//   chatStatus: 'disconnected',
//   error: null,
//   loading: false
// }

const renderComponent = (appState: any) => {
  return render(
    <AppStateContext.Provider value={{ state: appState, dispatch: mockDispatch }}>
      <Cards onCardClick={mockOnCardClick} />
    </AppStateContext.Provider>
  )
}

describe('Cards Component', () => {
  // beforeEach(() => {
  //   ;(getUsers as jest.Mock).mockResolvedValue(mockUsers)
  // })

  afterEach(() => {
    jest.clearAllMocks()
  })

  fit('should render loading state initially', () => {
    render(<Cards onCardClick={mockOnCardClick} />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  fit('should render "No meetings have been arranged" when no users are returned', () => {
    // ;(getUsers as jest.Mock).mockResolvedValueOnce([])
    server.use(
      http.get('https://dummy.restapiexample.com/api/v1/clients', () => {
        return HttpResponse.json({ status: 'success', data: [] })
      })
    )
    render(<Cards onCardClick={mockOnCardClick} />)
    waitFor(() => {
      expect(screen.getByText(/no meetings have been arranged/i)).toBeInTheDocument()
    })
  })

  fit('should render user card after users are loaded', () => {
    render(<Cards onCardClick={mockOnCardClick} />)
    waitFor(() => {
      expect(screen.getByText(/John\s*Doe/i)).toBeInTheDocument()
      expect(screen.getByText(/Meeting 1/i)).toBeInTheDocument()
      expect(screen.getByText(/Steve/i)).toBeInTheDocument()
      expect(screen.getByText(/Meeting 2/i)).toBeInTheDocument()
      expect(screen.getByText(/James/i)).toBeInTheDocument()
      expect(screen.getByText(/Meeting 3/i)).toBeInTheDocument()
    })
  })

  fit('should call onCardClick when a user card is clicked', async () => {
    const appState = {
      isChatHistoryOpen: false,
      chatHistoryLoadingState: 'idle',
      isCosmosDBAvailable: { cosmosDB: true },
      chatHistory: [],
      cosmosDBMessage: '',
      lastUpdated: '',
      cosmosDBStatus: '',
      activeUserId: null,
      chatStatus: 'disconnected',
      error: null,
      loading: false
    }
    renderComponent(appState)

    // await waitFor(() => {
    //   expect(screen.getByText('John Doe', { exact: false })).toBeInTheDocument()
    // }).then(() => {
    //   fireEvent.click(screen.getByText('John Doe', { exact: false }))
    const johnDoeElement = await screen.findByText(/John\s*Doe/i)
    fireEvent.click(johnDoeElement)

    expect(mockOnCardClick).toHaveBeenCalledWith({
      ClientId: 1,
      ClientName: 'John Doe',
      NextMeeting: 'Meeting 1',
      NextMeetingTime: '10:00 AM',
      NextMeetingEndTime: '11:00 AM',
      AssetValue: '1000',
      LastMeeting: 'Previous Meeting 1',
      LastMeetingStartTime: '09:00 AM',
      LastMeetingEndTime: '10:00 AM',
      ClientSummary: 'Summary of the client 1',
      chartUrl: ''
    })
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_CLIENT_ID',
      payload: '1'
    })
  })
})

fit('should render "No future meetings have been arranged" when there is only one user', () => {
  // ;(getUsers as jest.Mock).mockResolvedValueOnce([mockUsers[0]])
  server.use(
    http.get('https://dummy.restapiexample.com/api/v1/clients', () => {
      return HttpResponse.json({
        status: 'success',
        data: [
          {
            ClientId: 1,
            ClientName: 'John Doe',
            NextMeeting: 'Meeting 1',
            NextMeetingTime: '10:00 AM',
            NextMeetingEndTime: '11:00 AM',
            AssetValue: '1000',
            LastMeeting: 'Previous Meeting 1',
            LastMeetingStartTime: '09:00 AM',
            LastMeetingEndTime: '10:00 AM',
            ClientSummary: 'Summary of the client 1',
            chartUrl: ''
          }
        ]
      })
    })
  )
  render(<Cards onCardClick={mockOnCardClick} />)
  waitFor(() => {
    expect(screen.findByText('No future meetings have been arranged')).toBeInTheDocument()
  })
})
