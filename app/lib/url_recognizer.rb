# frozen_string_literal: true

class UrlRecognizer
  def self.recognize(url)
    if ActionController::Base.config.relative_url_root.present?
      url = url.sub(ActionController::Base.config.relative_url_root, '')
    end
    Rails.application.routes.recognize_path(url)
  end
end
