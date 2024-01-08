Feature: write config

  Scenario: write json config
    Given the desired config file format is "json"
    When the config file is written
    And the config is defined in the file

  Scenario: write yaml config
    Given the desired config file format is "yaml"
    When the config file is written
    And  the config is defined in the file
