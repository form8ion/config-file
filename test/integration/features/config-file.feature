Feature: config file

  Scenario: write json config
    Given the desired config file format is "json"
    When the config file is written
    And the config is defined in the file

  Scenario: write yaml config
    Given the desired config file format is "yaml"
    When the config file is written
    And  the config is defined in the file

  Scenario: load json config
    Given a "json" config file exists
    When the config file is loaded
    Then the config is parsed from the file

  Scenario: load yaml config
    Given a "yaml" config file exists
    When the config file is loaded
    Then the config is parsed from the file
