import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../pages/index';

jest.mock('next/router', () => require('next-router-mock'));
 
describe('Home page', () => {
    
  it('renders a heading with the portfolio owner name', () => {
    render(<Home name='Bryan Balderrama' />)
 
    const heading = screen.getByRole('heading', {
      name: /Bryan Balderrama/i,
    });
 
    expect(heading).toBeInTheDocument();
  });

  it('renders a summary with the portfolio owner summary', () => {
    render(<Home summary='My summary' />)
 
    const summary = screen.getByText('My summary');
 
    expect(summary).toBeInTheDocument();
  });

  // optional name: it should render a name when something happend
});