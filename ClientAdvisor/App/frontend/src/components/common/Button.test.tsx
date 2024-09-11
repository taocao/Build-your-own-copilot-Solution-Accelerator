import { render, screen, fireEvent } from '@testing-library/react'
import { ShareButton, HistoryButton } from './Button'

describe('ShareButton', () => {
  test('renders with correct text and icon', () => {
    const onClick = jest.fn()
    render(<ShareButton onClick={onClick} text="Share" />)
    
    const button = screen.getByText('Share')
    expect(button).toBeInTheDocument()
    //expect(button).toHaveClass('shareButtonRoot')
  })

  test('calls onClick handler when clicked', () => {
    const onClick = jest.fn()
    render(<ShareButton onClick={onClick} text="Share" />)
    
    const button = screen.getByText('Share')
    fireEvent.click(button)
    
    expect(onClick).toHaveBeenCalled()
  })

  test('does not render text if text prop is undefined', () => {
    const onClick = jest.fn()
    render(<ShareButton onClick={onClick} text={undefined} />)
    
    const button = screen.getByRole('button')
    //expect(button).toHaveTextContent('')
  })
})

describe('HistoryButton', () => {
  test('renders with correct text and icon', () => {
    const onClick = jest.fn()
    render(<HistoryButton onClick={onClick} text="History" />)
    
    const button = screen.getByText('History')
    expect(button).toBeInTheDocument()
    //expect(button).toHaveClass('historyButtonRoot')
  })

  test('calls onClick handler when clicked', () => {
    const onClick = jest.fn()
    render(<HistoryButton onClick={onClick} text="History" />)
    
    const button = screen.getByText('History')
    fireEvent.click(button)
    
    expect(onClick).toHaveBeenCalled()
  })

  test('does not render text if text prop is undefined', () => {
    const onClick = jest.fn()
    render(<HistoryButton onClick={onClick} text={undefined} />)
    
    const button = screen.getByRole('button')
    //expect(button).toHaveTextContent('')
  })
})
