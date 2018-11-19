class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.order(created_at: :desc).page(params[:page]).per(PER_PAGE_5)
  end

  def show
    @comments = @post.comment_threads.order('created_at desc')
    @new_comment = Comment.build_from(@post, 'current_user.id', "")
  end

  def new
    @post = Post.new
  end

  def edit; end

  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        if params[:continue]
          format.html { redirect_to edit_post_path(@post), notice: 'Post was successfully created.' }
        else
          format.html { redirect_to posts_path, notice: 'Post was successfully created.' }
        end
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        if params[:continue]
          format.html { redirect_to edit_post_path(@post), notice: 'Post was successfully created.' }
        else
          format.html { redirect_to posts_path, notice: 'Post was successfully updated.' }
        end
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
    end
  end

  private
  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:name, :content, :category_id)
  end

  def model_name
    controller_name.classify
  end
  def model_constantize
    controller_name.classify.constantize
  end
end
