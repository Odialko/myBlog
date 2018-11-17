module ApplicationHelper

  def icon(name)
    content_tag(:i, '', class: "fa fa-#{name} mr-3", 'aria-hidden': "true")
  end

  def format_date_time(date_time, delimiter = '.')
    date_time.try(:strftime, ("%d#{delimiter}%m#{delimiter}%Y - %H:%M")) unless date_time.blank?
  end
end
