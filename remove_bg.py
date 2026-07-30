from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # white threshold
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_bg("/Users/phil/.gemini/antigravity/brain/15828d30-a727-4171-8aca-29d8f4e69d44/.user_uploaded/media__1785385202350.jpg", "/Users/phil/.gemini/antigravity/scratch/234africa/assets/234logo-transparent.png")
