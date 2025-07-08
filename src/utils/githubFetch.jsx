export async function getRecentRepos(username, count = 6) {
    const url = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

    try {
        const response = await fetch(url);
        
        if (response.ok) {
            const repos = await response.json();
            const recentRepos = repos.slice(0, count);

            return recentRepos.map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                url: repo.html_url
            }));
        } else {
            console.error(`Error: Unable to fetch data (Status code: ${response.status})`);
            return { error: `Failed to fetch repos (Status: ${response.status})` };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Network error or invalid response' };
    }
}
