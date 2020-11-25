<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = User::find($this->route('user'));
        return [
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email'     => ['required','email', Rule::unique('users')->ignore($user) ],
            'role_id'   => ['required','numeric']
        ];
    }
}
