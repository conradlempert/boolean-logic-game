FROM ruby:2.4.1-slim

MAINTAINER Aron Kunze <aron.kunze@gmail.com>
RUN apt-get update && apt-get install -qq -y --no-install-recommends build-essential nodejs libpq-dev git npm
RUN npm install -g yarn

ENV INSTALL_PATH /openhpigame
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH


COPY /gems ./gems
COPY Gemfile Gemfile.lock ./
RUN gem update --system
RUN bundle install --binstubs

COPY . .

RUN bundle exec rake RAILS_ENV=production DATABASE_URL=postgresql://user:pass@127.0.0.1/dbname SECRET_TOKEN=dummytoken SECRET_KEY_BASE=dummy assets:precompile
VOLUME ["$INSTALL_PATH/public"]
CMD puma -C config/puma.rb
