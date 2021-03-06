class CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  def index
    @categories = Category.order(created_at: :desc).page(params[:page]).per(PER_PAGE_5)
  end

  def show
    @comments = @category.comments
    @new_comment = Comment.new
  end

  def new
    @category = Category.new
  end

  def edit; end

  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        if params[:continue]
          format.html { redirect_to edit_category_path(@category), notice: 'Post was successfully updated.' }
        else
          format.html { redirect_to categories_path, notice: 'Category was successfully created.' }
        end
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @category.update(category_params)
        if params[:continue]
          format.html { redirect_to edit_category_path(@category), notice: 'Post was successfully updated.' }
        else
          format.html { redirect_to categories_path, notice: 'Category was successfully updated.' }
        end
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to action: :index, notice: 'category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
