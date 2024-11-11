Feature: load config

  Scenario: load json config
    Given a "json" config file exists
    When the config file is loaded
    Then the config is parsed from the file

  Scenario: load yaml config
    Given a "yaml" config file exists
    When the config file is loaded
    Then the config is parsed from the file

  @wip
  Scenario: load common-js config
    Given a "cjs" config file exists
    When the config file is loaded
    Then the config is parsed from the file

  Scenario: no config exists
    Given no config exists
    When the config file is loaded
    Then a missing-config error is thrown
