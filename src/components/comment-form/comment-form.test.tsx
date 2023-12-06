import CommentForm from './comment-form';
import { render, screen } from '@testing-library/react';

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const mockEmit = () => new Promise(() => {}).then(() => {});

    render(<CommentForm onCommentSend={mockEmit}/>);

    expect(screen.getByText('Comment form')).toBeInTheDocument();
  });
});
