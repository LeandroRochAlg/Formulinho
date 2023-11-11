from selenium import webdriver
from selenium.webdriver.common.by import By
import requests

# https://media.formula1.com/image/upload/f_auto/q_auto/v1677249930/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/8col/image.png

# https://media.formula1.com/image/upload/f_auto/q_auto/v1677249930/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/8col/image.png

# https://media.formula1.com/image/upload/f_auto/q_auto/v1677249930/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/8col/image.png

pistas2018 = ['Australia', 'Bahrain', 'China', 'Azerbaijan', 'Spain', 'Monaco', 'Canada', 'France', 'Austria', 'Great_Britain', 'Germany', 'Hungary', 'Belgium', 'Italy', 'Singapore', 'Russia', 'Japan', 'United_States', 'Mexico', 'Brazil', 'Abu_Dhabi']

pistas2019 = ['Australia', 'Bahrain', 'China', 'Azerbaijan', 'Spain', 'Monaco', 'Canada', 'France', 'Austria', 'Great_Britain', 'Germany', 'Hungary', 'Belgium', 'Italy', 'Singapore', 'Russia', 'Japan', 'Mexico', 'United_States', 'Brazil', 'Abu_Dhabi']

pistas2020 = ['Austria', 'Styria', 'Hungary', 'Great_Britain', '70th_Anniversary', 'Spain', 'Belgium', 'Italy', 'Tuscany', 'Russia', 'Eifel', 'Portugal', 'Emilia_Romagna', 'Turkey', 'Bahrain', 'Sakhir', 'Abu_Dhabi']

pistas2021 = ['Bahrain', 'Imola', 'Portugal', 'Spain', 'Monaco', 'Azerbaijan', 'France', 'Styria', 'Austria', 'Great_Britain', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Russia', 'Turkey', 'United_States', 'Mexico', 'Brazil', 'Australia', 'Saudi_Arabia', 'Abu_Dhabi']

pistas2022 = ['Bahrain', 'Saudi_Arabia', 'Australia', 'Imola', 'Miami', 'Spain', 'Monaco', 'Azerbaijan', 'Canada', 'France', 'Austria', 'Great_Britain', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Singapore', 'Japan', 'United_States', 'Mexico', 'Brazil', 'Abu_Dhabi']

pistas2023 = ['Bahrain', 'Australia', 'Imola', 'Miami', 'Spain', 'Monaco', 'Azerbaijan', 'Canada', 'Austria', 'Great_Britain', 'Hungary', 'Belgium', 'Netherlands', 'Italy', 'Singapore', 'Japan', 'Qatar', 'United_States', 'Mexico', 'Brazil', 'Saudi_Arabia', 'Las_Vegas' 'Abu_Dhabi']

pistas = [pistas2018, pistas2019, pistas2020, pistas2021, pistas2022, pistas2023]

for ano in range(2018, 2024):
    for pista in pistas[ano-2018]:
        url = f"https://www.formula1.com/en/racing/{ano}/{pista}/Circuit.html"

        # Configurar o navegador (certifique-se de ter o WebDriver correspondente instalado)
        driver = webdriver.Chrome()  # Você pode usar outro driver como o Firefox ou Edge

        # Acessar a página
        driver.get(url)

        # Aguardar o carregamento da página (você pode ajustar este tempo conforme necessário)
        driver.implicitly_wait(10)

        # Encontrar todas as tags da imagem usando a classe e a tag específicas
        image_tags = driver.find_elements(By.CLASS_NAME, 'lazy.loaded')

        # Verificar se há pelo menos quatro imagens
        if len(image_tags) >= 4:
            # Obter a tag da quarta imagem
            image_tag = image_tags[3]

            # Obter o URL da imagem
            image_url = image_tag.get_attribute('data-src')
            
            # Verificar se a URL contém a extensão desejada (por exemplo, '.png')
            if image_url.endswith('.png'):
                # Agora você pode fazer o download da imagem usando a biblioteca requests ou urllib
                image_data = requests.get(image_url).content

                # Salvar a imagem no disco ou processar conforme necessário
                with open(f'extra/pistas/{ano}/{pista}.png', 'wb') as f:
                    f.write(image_data)
                print("Quarta imagem baixada com sucesso.")
            else:
                print("A URL da quarta imagem não possui a extensão desejada.")
        else:
            print("Menos de quatro imagens encontradas na página.")

        # Fechar o navegador
        driver.quit()