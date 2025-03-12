Feature: canary test

  Scenario: canary test without other tests yet
    Given vitest is configured for the project
    And the canary test still exists
    When the project is lifted
    Then the canary test is not removed

  Scenario: other vitest tests exist, but canary test still exists
    Given vitest is configured for the project
    And other vitest tests exist
    And the canary test still exists
    When the project is lifted
    Then the canary test is removed

  Scenario: other vitest tests exist, but canary test no longer exists
    Given vitest is configured for the project
    And other vitest tests exist
    When the project is lifted
    Then the canary test is removed
