class FileRecordsController < ApplicationController
  before_action :set_parent, except: :destroy
  before_action :set_file_record, only: :destroy

  def index
    @file_records = @parent.file_records
    respond_to do |f|
      f.json
    end
  end

  def create
    @file_record = FileRecord.new(fileable: @parent, attachment: params[:file])
    if @file_record.save
      respond_to do |format|
        format.js
        format.json { render json: @file_record.attachment.url, status: :ok }
      end
    end
  end

  def destroy
    @file_record.destroy
    respond_to do |format|
      format.js
      format.json { head :no_content }
    end
  end

  private
  def set_parent
    model = params[:record_type] || 'Post'
    @parent = model.singularize.classify.constantize.find(params["#{model.downcase}_id".to_sym])
  end

  private
  def set_file_record
    @file_record = FileRecord.find(params[:id])
  end
end
