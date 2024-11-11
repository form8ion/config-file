Feature: exists

  Scenario: json config exists
    Given a "json" config file exists
    When checking for config existence
    Then the config is reported to be found

  Scenario: yaml config exists
    Given a "yaml" config file exists
    When checking for config existence
    Then the config is reported to be found

  Scenario: no config exists
    Given no config exists
    When checking for config existence
    Then the config is reported to not be found
