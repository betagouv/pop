replace_string() {
	local input="$1"
	local replace_by="$2"

	echo "Replacing $input by $replace_by"

	grep -rl "${input}" ./build | xargs -i@ sed -i "s|$input|$replace_by|g" @
}

replace_string "OVERRIDE_API_URL" "$API_URL"
replace_string "OVERRIDE_POP_URL" "${POP_URL}"
replace_string "OVERRIDE_BUCKET_URL" "${BUCKET_URL}"
replace_string "OVERRIDE_PUBLIC_URL" "${PUBLIC_URL}"
