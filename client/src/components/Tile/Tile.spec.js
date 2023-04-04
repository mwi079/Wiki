
import { render, screen, fireEvent} from '@testing-library/react'

import '@testing-library/jest-dom'
import Tile from './Tile'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

describe('<Tile/>', () => {
    const props = {
      document:{title:'Testing', data:'123'}
    }
    beforeEach(()=>{
        render(
            <Tile {...props} />
        )
    })

    it('should display in a readable format', () => {
        expect(screen.getByText('Testing')).toBeDefined()
        expect(screen.getByText('123')).toBeDefined()
    })
    it('should try to redirect when the tile is clicked',async()=>{
        const button=screen.getByTestId('click')
        fireEvent.click(button)
        expect(mockedUsedNavigate).toHaveBeenCalled()

    })
}) 
  