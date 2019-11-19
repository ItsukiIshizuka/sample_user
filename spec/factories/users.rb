FactoryBot.define do
  factory :user do
    nickname                                             {"nick"}
    email                                                {"test55@test.com"}
    password                                             {"test1234"}
    family_name                                          {"太郎"}
    first_name                                           {"彩"}
    family_name_cana                                     {"タロウ"}
    first_name_cana                                      {"アヤ"}
  end
end