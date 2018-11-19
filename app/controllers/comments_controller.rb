class CommentsController < ApplicationController
  def create
    if params[:post_id]
      @post = Post.find(params[:post_id])
      @comment = Comment.new(commentable: @post, content: params[:comment][:content], author: params[:comment][:author])
    else
      @category = Category.find(params[:category_id])
      @comment = Comment.new(commentable: @category, content: params[:comment][:content], author: params[:comment][:author])
    end
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
