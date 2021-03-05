/**
 * Is ID
 *
 * Check if the input string is a valid ID
 *
 * @param id The ID
 *
 * @returns {boolean} Whether or not the input string is a valid ID
 */
export default function isID(id: string): boolean {

    // Return
    return /^[0-9]{17,}$/.test(id);
}