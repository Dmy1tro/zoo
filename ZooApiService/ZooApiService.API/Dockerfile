FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as base
WORKDIR /src
EXPOSE 80
EXPOSE 443

COPY ["ZooApiService.API/ZooApiService.API.csproj", "ZooApiService.API/"]
COPY ["ZooApiService.BLL.Contracts/ZooApiService.BLL.Contracts.csproj", "ZooApiService.BLL.Contracts/"]
COPY ["ZooApiService.BLL.Domain/ZooApiService.BLL.Domain.csproj", "ZooApiService.BLL.Domain/"]
COPY ["ZooApiService.Common/ZooApiService.Common.csproj", "ZooApiService.Common/"]
COPY ["ZooApiService.DAL.Data/ZooApiService.DAL.Data.csproj", "ZooApiService.DAL.Data/"]

RUN dotnet restore "ZooApiService.API/ZooApiService.API.csproj"
COPY . .
WORKDIR "/src/ZooApiService.API"
RUN dotnet publish -c Release -o /src/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /src
COPY --from=base /src/publish .
ENTRYPOINT ["dotnet", "ZooApiService.API.dll"]
