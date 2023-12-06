import CommentItem from './comment-item';
import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';

describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeComment();

    render(<CommentItem comment={fakeComment}/>);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
