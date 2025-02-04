<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Accomplishment>
 */
class AccomplishmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'user_id' => fn() => User::factory()->create()->id,
            'week_ending_date' => fn() => now()->subWeeks(rand(1, 52))->endOfWeek()->format('Y-m-d'),
            'accomplishments_this_week' => $this->faker->paragraphs(3, true),
            'action_items_next_week' => $this->faker->paragraphs(3, true),
            'planned_hours_worked' => $this->faker->randomFloat(1, 2, 1),
            'actual_hours_worked' => $this->faker->randomFloat(1, 2, 1),
            'need_help' => $this->faker->boolean(),
            'issues_or_concerns' => $this->faker->paragraphs(3, true),
            'attachments' => $this->faker->optional()->url,
            'attachment_type' => $this->faker->randomElement(['file', 'link']),
            'label' => $this->faker->optional()->word
        ];
    }
}
