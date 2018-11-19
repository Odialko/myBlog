class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])

    @comment = Comment.new(commentable: @post, content: params[:comment][:content])
    if @comment.save
      render partial: "comments/comment", locals: { comment: @comment }, layout: false, status: :created
    else
      render js: "alert('Не всі поля заповнено');"
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render json: @comment, status: :ok
    else
      render js: "alert('error deleting comment');"
    end
  end
end
