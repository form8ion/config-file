Feature: merge config

  @wip
  Scenario: merge with existing json file
    Given a "json" config file exists
    When the provided config is merged into the existing file
    Then the "json" file will have the provided config merged into it

  @wip
  Scenario: merge with existing yaml file
    Given a "yaml" config file exists
    When the provided config is merged into the existing file
    Then the "yaml" file will have the provided config merged into it
