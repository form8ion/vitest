Feature: when

  Scenario: replace jest package with vitest package
    Given vitest is configured for the project
    When the project is lifted
    Then jest-when is replaced with vitest-when
