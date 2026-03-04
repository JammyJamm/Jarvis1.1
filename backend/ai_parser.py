def parse_command_to_selector(prompt: str):
    prompt = prompt.lower()

    if "learn more" in prompt or "read more" in prompt:
        return "a[href='https://iana.org/domains/example']", "Clicked Learn More link"

    return None, "No actionable element found"