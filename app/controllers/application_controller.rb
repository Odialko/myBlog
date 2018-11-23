require 'browser'
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_current_ip, :unic_browser_count

  PER_PAGE_5 = 5

  def unic_browser_count
    @browsers = Statistic.group(:browser).count
  end

  private
  def set_current_ip
    ip_detect = request.remote_ip
    ip_check = Statistic.find_by(ip_address: ip_detect) if ip_detect.present?
    unless ip_check.present?
      user = Statistic.new
      user.update(ip_address: ip_detect, browser: browser.name)
    end
  end
end
