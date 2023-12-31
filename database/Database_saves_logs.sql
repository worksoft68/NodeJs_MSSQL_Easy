USE [master]
GO
/****** Object:  Database [FutureOffice_Log]    Script Date: 26/10/2023 9:50:15 AM ******/
CREATE DATABASE [FutureOffice_Log]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FutureOffice_Log', FILENAME = N'D:\Database\FutureOffice\FutureOffice_Log.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FutureOffice_Log_log', FILENAME = N'D:\Database\FutureOffice\FutureOffice_Log_log.ldf' , SIZE = 6272KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FutureOffice_Log] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FutureOffice_Log].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FutureOffice_Log] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET ARITHABORT OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FutureOffice_Log] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FutureOffice_Log] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FutureOffice_Log] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FutureOffice_Log] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET RECOVERY FULL 
GO
ALTER DATABASE [FutureOffice_Log] SET  MULTI_USER 
GO
ALTER DATABASE [FutureOffice_Log] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FutureOffice_Log] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FutureOffice_Log] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FutureOffice_Log] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [FutureOffice_Log] SET DELAYED_DURABILITY = DISABLED 
GO
USE [FutureOffice_Log]
GO
/****** Object:  Table [dbo].[SystemLog]    Script Date: 26/10/2023 9:50:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemLog](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Action] [nvarchar](15) NULL,
	[ImpactZone] [nvarchar](60) NULL,
	[IdTable] [nvarchar](25) NULL,
	[ContentLog] [nvarchar](2000) NULL,
	[ContentLogMax] [nvarchar](max) NULL,
	[IP] [nvarchar](15) NULL,
	[MacAddress] [nvarchar](20) NULL,
	[HostName] [nvarchar](200) NULL,
	[UserId] [bigint] NULL,
	[FullName] [nvarchar](40) NULL,
	[DateTimeLog] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
USE [master]
GO
ALTER DATABASE [FutureOffice_Log] SET  READ_WRITE 
GO
