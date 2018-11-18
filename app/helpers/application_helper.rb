module ApplicationHelper

  def icon(name)
    content_tag(:i, '', class: "fa fa-#{name} mr-3", 'aria-hidden': "true")
  end

  def format_date_time(date_time, delimiter = '.')
    date_time.try(:strftime, ("%d#{delimiter}%m#{delimiter}%Y - %H:%M")) unless date_time.blank?
  end

  def file_icon(attachment)
    return attachment.url if image?(attachment.file.extension)
    image_path 'file_icon.png'
  end
  def attachment_url(attachment_obj)
    attachment_obj.attachment.url || attachment_obj.external_link
  end

  def attachment_source_name(attachment_obj)
    attachment_obj.attachment.file.try(:filename) || attachment_obj.external_link
  end

  def attachment_name_without_ext(attachment_obj)
    if attachment_obj.attachment.present?
      attachment_obj.attachment.file.filename.gsub(".#{attachment_obj.attachment.file.filename.split('.').last}", '')
    else
      attachment_obj.external_link
    end
  end

  def attachment_size_and_extension(attachment_obj)
    if attachment_obj.attachment.present?
      "#{number_to_human_size(attachment_obj.attachment.file.size, precision: 2, separator: '.')} | (#{attachment_obj.attachment.file.filename.split('.').last.upcase})"
    else
      'N/A'
    end
  end
  private
  def image?(ext)
    %w(jpeg jpg png gif).include?(ext)
  end
end
