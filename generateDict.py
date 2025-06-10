# Path to the system dictionary file
dictionary_path = "/usr/share/dict/words"

# Read and filter 6-letter words
with open(dictionary_path, "r") as f:
    words = [word.strip().lower() for word in f if len(word.strip()) == 6 and word.strip().isalpha()]

# Deduplicate and sort
unique_words = sorted(set(words))

# Save to a text file
with open("6_letter_words.txt", "w") as f:
    for word in unique_words:
        f.write(word + "\n")

print(f"Saved {len(unique_words)} words to 6_letter_words.txt")
