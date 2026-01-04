const description = 'Personal site for Charles DiLaurenzio'

export function generate_vercel_image(title) {
    const encoded_title = encodeURI(title)
    return `https://og-image.vercel.app/${encoded_title}.png?theme=dark&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg`
}

export function generate_open_graph(title) {
    const image = generate_vercel_image(title)
    return {
        title,
        description,
        siteName: 'CDilz',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: image,
                width: 2048,
                height: 1170
            }
        ]
    }
}

export function generate_twitter(title) {
    return {
        title,
        card: 'summary_large_image',
        description,
        images:[
            generate_vercel_image(title)
        ]
    }
}
